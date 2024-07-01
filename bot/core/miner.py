import math
import time
import os.path
import uuid
import subprocess
import asyncio
import pandas as pd
from pathlib import Path
from urllib.parse import unquote, quote
from typing import Any, Tuple, Optional, Dict, List

import aiohttp
from aiohttp_proxy import ProxyConnector
from better_proxy import Proxy
from pyrogram import Client
from pyrogram.errors import Unauthorized, UserDeactivated, AuthKeyUnregistered
from pyrogram.raw.functions.messages import RequestWebView

from bot.utils import logger
from bot.exceptions import InvalidSession
from .headers import headers
from bot.config import settings


class Miner:
    def __init__(self, tg_client: Client):
        self.session_name = tg_client.name
        self.tg_client = tg_client

        self.boats = [
            {
                "level": 0,
                "fishing_time": 20000,
                "price_upgrade": "20000000000"
            },
            {
                "level": 1,
                "fishing_time": 30000,
                "price_upgrade": "40000000000"
            },
            {
                "level": 2,
                "fishing_time": 40000,
                "price_upgrade": "60000000000"
            },
            {
                "level": 3,
                "fishing_time": 60000,
                "price_upgrade": "100000000000"
            },
            {
                "level": 4,
                "fishing_time": 120000,
                "price_upgrade": "160000000000"
            },
            {
                "level": 5,
                "fishing_time": 240000,
                "price_upgrade": "320000000000"
            }
        ]

        self.meshes = [
            {
                "level": 0,
                "price_upgrade": "20000000000",
                "speed": 5000
            },
            {
                "level": 1,
                "price_upgrade": "100000000000",
                "speed": 7500
            },
            {
                "level": 2,
                "price_upgrade": "200000000000",
                "speed": 10000
            },
            {
                "level": 3,
                "price_upgrade": "400000000000",
                "speed": 12500
            },
            {
                "level": 4,
                "price_upgrade": "2000000000000",
                "speed": 15000
            },
            {
                "level": 5,
                "price_upgrade": "4000000000000",
                "speed": 25000
            }
        ]

    async def get_tg_web_data(self, proxy: str | None) -> Tuple[str, int]:
        try:
            if proxy:
                proxy = Proxy.from_str(proxy)
                proxy_dict = dict(
                    scheme=proxy.protocol,
                    hostname=proxy.host,
                    port=proxy.port,
                    username=proxy.login,
                    password=proxy.password
                )
            else:
                proxy_dict = None

            self.tg_client.proxy = proxy_dict

            if not self.tg_client.is_connected:
                try:
                    await self.tg_client.connect()
                except (Unauthorized, UserDeactivated, AuthKeyUnregistered):
                    raise InvalidSession(self.session_name)

            web_view = await self.tg_client.invoke(RequestWebView(
                peer=await self.tg_client.resolve_peer('waveonsuibot'),
                bot=await self.tg_client.resolve_peer('waveonsuibot'),
                platform='android',
                from_bot_menu=False,
                url='https://walletapp.waveonsui.com/'
            ))

            auth_url = web_view.url
            tg_web_data = unquote(
                string=unquote(
                    string=auth_url.split('tgWebAppData=', maxsplit=1)[1].split('&tgWebAppVersion', maxsplit=1)[0]))

            res = ''
            params = tg_web_data.split('&')
            for param in params:
                vals = param.split('=')
                res += f"{vals[0]}={quote(vals[1])}&"
            res = res[:-1]

            username = self.session_name[5:]
            user_peer_id = await self.tg_client.resolve_peer(username)
            user_id = int(user_peer_id.user_id)

            if self.tg_client.is_connected:
                await self.tg_client.disconnect()

            return res, user_id

        except InvalidSession as error:
            raise error

        except Exception as error:
            logger.error(f"{self.session_name} | Unknown error during Authorization: {error}")
            await asyncio.sleep(delay=7)

    def get_id(self) -> int:
        filename = 'sessions/ids/' + self.session_name + '_ids.txt'
        if os.path.exists(filename):
            with open(filename, 'r') as file:
                data = file.read().replace('\n', '')
                try:
                    return int(data)
                except Exception as e:
                    return 1
        return 1

    def save_id(self, id: int) -> None:
        filename = 'sessions/ids/' + self.session_name + '_ids.txt'
        with open(filename, "w") as file:
            file.write(str(id))

    async def check_proxy(self, http_client: aiohttp.ClientSession, proxy: Proxy) -> None:
        try:
            response = await http_client.get(url='https://httpbin.org/ip', timeout=aiohttp.ClientTimeout(5))
            ip = (await response.json()).get('origin')
            logger.info(f"{self.session_name} | Proxy IP: {ip}")
        except Exception as error:
            logger.error(f"{self.session_name} | Proxy: {proxy} | Error: {error}")

    async def login(self, http_client: aiohttp.ClientSession, tg_web_data: str, address: str, signature: str) -> str:
        try:
            response = await http_client.post(
                url='https://api-walletapp.waveonsui.com/api/wallet/add',
                json={
                    "address": address,
                    "signature": signature,
                    "telegramData": tg_web_data,
                    "deviceId": str(uuid.uuid4())
                })
            response.raise_for_status()

            response_json = await response.json()
            access_token = response_json['access_token']

            return access_token
        except Exception as error:
            logger.error(f"{self.session_name} | Unknown error while getting Access Token: {error}")
            await asyncio.sleep(delay=7)

    async def get_ocean_balance(self, http_client: aiohttp.ClientSession, id: int, address: str) -> Dict[str, Any]:
        try:
            response = await http_client.post(
                url='https://fullnode.mainnet.sui.io/',
                json={
                    "jsonrpc": '2.0',
                    "id": id,
                    "method": 'suix_getBalance',
                    "params": [
                        address,
                        "0xa8816d3a6e3136e86bc2873b1f94a15cadc8af2703c075f2d546c2ae367f4df9::ocean::OCEAN"
                    ]
                })
            response.raise_for_status()

            response_json = await response.json()
            balance_info = response_json

            return balance_info
        except Exception as error:
            logger.error(f"{self.session_name} | Unknown error while getting Access Token: {error}")
            await asyncio.sleep(delay=7)

    async def get_sui_balance(self, http_client: aiohttp.ClientSession, id: int, address: str) -> Dict[str, Any]:
        try:
            response = await http_client.post(
                url='https://fullnode.mainnet.sui.io/',
                json={
                    "jsonrpc": '2.0',
                    "id": id,
                    "method": 'suix_getBalance',
                    "params": [
                        address,
                        "0x2::sui::SUI"
                    ]
                })
            response.raise_for_status()

            response_json = await response.json()
            balance_info = response_json

            return balance_info
        except Exception as error:
            logger.error(f"{self.session_name} | Unknown error while getting Access Token: {error}")
            await asyncio.sleep(delay=7)

    async def user_info(self, http_client: aiohttp.ClientSession, id: int, address: str) -> Dict[str, Any]:
        try:
            response = await http_client.post(
                url='https://fullnode.mainnet.sui.io/',
                json={
                    "jsonrpc": '2.0',
                    "id": id,
                    "method": 'suix_getDynamicFieldObject',
                    "params": [
                        "0x4846a1f1030deffd9dea59016402d832588cf7e0c27b9e4c1a63d2b5e152873a",
                        {
                            "type": "address",
                            "value": address
                        }
                    ]
                })
            response.raise_for_status()

            response_json = await response.json()
            balance_info = response_json

            return balance_info
        except Exception as error:
            logger.error(f"{self.session_name} | Unknown error while getting Access Token: {error}")
            await asyncio.sleep(delay=7)

    async def dry_run_transaction(self, http_client: aiohttp.ClientSession, params: List[str], id: int) -> Dict[str, Any]:
        try:
            response = await http_client.post(
                url='https://fullnode.mainnet.sui.io/',
                json={
                    "jsonrpc": "2.0",
                    "id": id,
                    "method": "sui_dryRunTransactionBlock",
                    "params": [
                        params[0]
                    ]
                })
            response.raise_for_status()

            response_json = await response.json()
            dry_res = response_json

            return dry_res
        except Exception as error:
            logger.error(f"{self.session_name} | Unknown error while getting Access Token: {error}")
            await asyncio.sleep(delay=7)

    async def execute_transaction(self, http_client: aiohttp.ClientSession, params: List[str], id: int) -> Dict[str, Any]:
        try:
            response = await http_client.post(
                url='https://fullnode.mainnet.sui.io/',
                json={
                    "jsonrpc": "2.0",
                    "id": id,
                    "method": "sui_executeTransactionBlock",
                    "params": [
                        params[0],
                        [
                            params[1]
                        ],
                        {
                            "showEffects": True
                        },
                        "WaitForLocalExecution"
                    ]
                })
            response.raise_for_status()

            response_json = await response.json()
            claim_res = response_json

            return claim_res
        except Exception as error:
            logger.error(f"{self.session_name} | Unknown error while getting Access Token: {error}")
            await asyncio.sleep(delay=7)

    async def claim(self, http_client: aiohttp.ClientSession, params: List[str], id: int, address: str) -> Dict[str, Any]:
        # logger.info(f"{self.session_name} | Dry run")
        dry_res = await self.dry_run_transaction(http_client=http_client, params=params, id=id)
        id += 1
        self.save_id(id)

        dry_status = dry_res['result']['effects']['status'] if dry_res.get('result') else {'status': 'error'}
        logger.info(f"{self.session_name} | Dry run status for claim: <c>{dry_status['status']}</c>")

        if dry_status['status'] == 'success':
            # logger.info(f"{self.session_name} | Claim run")
            claim_res = await self.execute_transaction(http_client=http_client, params=params, id=id)
            id += 1
            self.save_id(id)

            claim_status = claim_res['result']['effects']['status'] if claim_res.get('result') else {'status': 'error'}
            logger.info(f"{self.session_name} | Claim run status: <c>{claim_status['status']}</c>")

            if claim_status['status'] == 'success':
                # user_info = await self.user_info(http_client=http_client, id=id, address=address)
                id += 1
                self.save_id(id)

                balance_info = await self.get_ocean_balance(http_client=http_client, id=id, address=address)
                id += 1
                self.save_id(id)
                ocean_balance = float(balance_info['result']['totalBalance']) / 1000000000

                sui_info = await self.get_sui_balance(http_client=http_client, id=id, address=address)
                id += 1
                self.save_id(id)
                sui_balance = float(sui_info['result']['totalBalance']) / 1000000000

                logger.info(f"{self.session_name} | Claimed successfully, new ocean balance: <c>{ocean_balance}</c>, SUI balance: <c>{sui_balance}</c>")
                return claim_status
        return {'status': 'error'}

    def get_seed_phrase(self) -> Optional[str]:
        username = self.session_name[5:]
        filename = 'accounts_sui.xlsx'
        file = Path(filename)
        if not file.exists():
            return None

        df = pd.read_excel(filename)
        res = []
        for i in range(len(df.index)):
            res_dict = df.iloc[i].to_dict()
            res.append(res_dict)

        for account in res:
            if account.get('username') and account.get('username').lower() == username.lower():
                return account.get('seed_phrase')
        return None

    def get_signature_and_address(self, user_id: int) -> Tuple[str, str]:
        seed_phrase = self.get_seed_phrase()
        if not seed_phrase:
            raise Exception(f"Seed phrase not found for {self.session_name}")

        args = ['node', 'sign/wave.js', "-mode", "sign", "-seed", seed_phrase, "-userId", str(user_id)]
        res = subprocess.run(args, stdout=subprocess.PIPE).stdout.decode('utf-8')
        rows = res.split('\n')

        address = rows[0]
        address = address[len('Address: '):].strip()

        signature = rows[3]
        signature = signature[len('Signature: '):].strip()
        return address, signature

    def get_params_for_claiming(self, user_id: int) -> Tuple[str, str]:
        seed_phrase = self.get_seed_phrase()
        if not seed_phrase:
            raise Exception(f"Seed phrase not found for {self.session_name}")

        args = ['node', 'sign/wave.js', "-mode", "claim", "-seed", seed_phrase, "-userId", str(user_id)]
        res = subprocess.run(args, stdout=subprocess.PIPE).stdout.decode('utf-8')
        rows = res.split('\n')

        param1 = rows[3]
        param1 = param1[len('Param 1: '):].strip()

        param2 = rows[4]
        param2 = param2[len('Param 2: '):].strip()
        return param1, param2

    def get_params_for_upgrade_speed(self, user_id: int, amount: int) -> Tuple[str, str]:
        seed_phrase = self.get_seed_phrase()
        if not seed_phrase:
            raise Exception(f"Seed phrase not found for {self.session_name}")

        args = ['node', 'sign/wave.js', "-mode", "upgradeSpeed", "-seed", seed_phrase, "-userId", str(user_id), "-amount", str(amount)]
        res = subprocess.run(args, stdout=subprocess.PIPE).stdout.decode('utf-8')
        rows = res.split('\n')

        param1 = rows[3]
        param1 = param1[len('Param 1: '):].strip()

        param2 = rows[4]
        param2 = param2[len('Param 2: '):].strip()
        return param1, param2

    def get_params_for_upgrade_storage(self, user_id: int, amount: int) -> Tuple[str, str]:
        seed_phrase = self.get_seed_phrase()
        if not seed_phrase:
            raise Exception(f"Seed phrase not found for {self.session_name}")

        args = ['node', 'sign/wave.js', "-mode", "upgradeStorage", "-seed", seed_phrase, "-userId", str(user_id), "-amount", str(amount)]
        res = subprocess.run(args, stdout=subprocess.PIPE).stdout.decode('utf-8')
        rows = res.split('\n')

        param1 = rows[3]
        param1 = param1[len('Param 1: '):].strip()

        param2 = rows[4]
        param2 = param2[len('Param 2: '):].strip()
        return param1, param2


    def is_claim_possible(self, user_info: Dict[str, Any]) -> bool:
        last_claim = int(user_info['result']['data']['content']['fields']['last_claim'])
        boat_level = int(user_info['result']['data']['content']['fields']['boat'])

        storage_hours = self.boats[boat_level]['fishing_time']/ 10000
        claim_time = storage_hours * 3600 * 1000 + last_claim
        cur_time = time.time() * 1000

        if cur_time >= claim_time:
            return True
        return False

    def get_next_claim_time_sleep(self, user_info: Dict[str, Any]) -> int:
        last_claim = int(user_info['result']['data']['content']['fields']['last_claim'])
        boat_level = int(user_info['result']['data']['content']['fields']['boat'])

        storage_hours = self.boats[boat_level]['fishing_time']/ 10000
        claim_time = storage_hours * 3600 * 1000 + last_claim

        diff = (claim_time - (time.time() * 1000)) / 1000
        return math.ceil(diff)

    async def upgrade_speed_if_possible(self, http_client: aiohttp.ClientSession, id: int, user_id: int, user_info: Dict[str, Any], balance_info: Dict[str, Any]) -> bool:
        mesh_level = user_info['result']['data']['content']['fields']['mesh']
        ocean_balance = float(balance_info['result']['totalBalance'])

        if settings.SPEED_MAX_LEVEL >= mesh_level:
            upgrade_price = 0
            for mesh in self.meshes:
                if mesh["level"] != mesh_level:
                    continue

                upgrade_price = int(mesh["price_upgrade"])
                break

            if upgrade_price == 0:
                return False

            if ocean_balance >= upgrade_price:
                logger.info(f"{self.session_name} | Upgrade speed (mesh) is possible, trying to upgrade")
                param1, param2 = self.get_params_for_upgrade_speed(user_id=user_id, amount=upgrade_price)
                params = [param1, param2]

                dry_res = await self.dry_run_transaction(http_client=http_client, params=params, id=id)
                id += 1
                self.save_id(id)

                dry_status = dry_res['result']['effects']['status'] if dry_res.get('result') else {'status': 'error'}
                logger.info(f"{self.session_name} | Dry run status for upgrade speed: <c>{dry_status['status']}</c>")

                if dry_status['status'] == 'success':
                    # logger.info(f"{self.session_name} | Claim run")
                    upgrade_res = await self.execute_transaction(http_client=http_client, params=params, id=id)
                    id += 1
                    self.save_id(id)

                    upgrade_status = upgrade_res['result']['effects']['status'] if upgrade_res.get('result') else {'status': 'error'}
                    logger.info(f"{self.session_name} | Upgrade speed (mesh) run status: <c>{upgrade_status['status']}</c>")
                    return True
        return False

    async def upgrade_boat_if_possible(self, http_client: aiohttp.ClientSession, id: int, user_id: int, user_info: Dict[str, Any], balance_info: Dict[str, Any]) -> bool:
        boat_level = user_info['result']['data']['content']['fields']['boat']
        ocean_balance = float(balance_info['result']['totalBalance'])

        if settings.STORAGE_MAX_LEVEL >= boat_level:
            upgrade_price = 0
            for boat in self.boats:
                if boat["level"] != boat_level:
                    continue

                upgrade_price = int(boat["price_upgrade"])
                break

            if upgrade_price == 0:
                return False

            if ocean_balance >= upgrade_price:
                logger.info(f"{self.session_name} | Upgrade storage (boat) is possible, trying to upgrade")
                param1, param2 = self.get_params_for_upgrade_storage(user_id=user_id, amount=upgrade_price)
                params = [param1, param2]

                dry_res = await self.dry_run_transaction(http_client=http_client, params=params, id=id)
                id += 1
                self.save_id(id)

                dry_status = dry_res['result']['effects']['status'] if dry_res.get('result') else {'status': 'error'}
                logger.info(f"{self.session_name} | Dry run status for upgrade storage: <c>{dry_status['status']}</c>")

                if dry_status['status'] == 'success':
                    # logger.info(f"{self.session_name} | Claim run")
                    upgrade_res = await self.execute_transaction(http_client=http_client, params=params, id=id)
                    id += 1
                    self.save_id(id)

                    upgrade_status = upgrade_res['result']['effects']['status'] if upgrade_res.get('result') else {'status': 'error'}
                    logger.info(f"{self.session_name} | Upgrade storage (boat) run status: <c>{upgrade_status['status']}</c>")
                    return True
        return False

    async def run(self, proxy: str | None) -> None:
        id: int = self.get_id()
        sleep_time = settings.DEFAULT_SLEEP

        access_token = None
        access_token_created_time = 0
        sleep_time = settings.DEFAULT_SLEEP
        proxy_conn = ProxyConnector().from_url(proxy) if proxy else None

        async with (aiohttp.ClientSession(headers=headers, connector=proxy_conn) as http_client):
            if proxy:
                await self.check_proxy(http_client=http_client, proxy=proxy)

            while True:
                try:
                    if not access_token or time.time() - access_token_created_time >= 3600:
                        tg_web_data, user_id = await self.get_tg_web_data(proxy=proxy)
                        address, signature = self.get_signature_and_address(user_id=user_id)
                        access_token = await self.login(http_client=http_client, tg_web_data=tg_web_data, address=address, signature=signature)

                        http_client.headers["Authorization"] = f"Bearer {access_token}"
                        headers["Authorization"] = f"Bearer {access_token}"

                        access_token_created_time = time.time()

                    if access_token:
                        balance_info = await self.get_ocean_balance(http_client=http_client, id=id, address=address)
                        id += 1
                        self.save_id(id)
                        ocean_balance = float(balance_info['result']['totalBalance']) / 1000000000
                        # logger.info(f"{self.session_name} | Ocean wave balance: <c>{ocean_balance}</c>")

                        sui_info = await self.get_sui_balance(http_client=http_client, id=id, address=address)
                        id += 1
                        self.save_id(id)
                        sui_balance = float(sui_info['result']['totalBalance']) / 1000000000
                        logger.info(f"{self.session_name} | Ocean wave balance: <c>{ocean_balance}</c>, SUI balance: <c>{sui_balance}</c>")

                        if sui_balance <= 0.0036:
                            logger.warning(f"{self.session_name} | Cannot claim without SUI")
                        else:
                            user_info = await self.user_info(http_client=http_client, id=id, address=address)
                            id += 1
                            self.save_id(id)

                            if self.is_claim_possible(user_info=user_info):
                                param1, param2 = self.get_params_for_claiming(user_id=user_id)
                                if not param1 or not param2:
                                    logger.error(f"{self.session_name} | Cannot compute transaction block params, claim is not possible")
                                else:
                                    params = [param1, param2]

                                    logger.info(f"{self.session_name} | Claim is possible, trying to claim")
                                    claim_status = await self.claim(http_client=http_client, params=params, id=id, address=address)
                                    id += 1
                                    self.save_id(id)

                            upgrade_speed_result = await self.upgrade_speed_if_possible(http_client=http_client, id=id, user_id=user_id, user_info=user_info, balance_info=balance_info)
                            id = self.get_id()
                            user_info = await self.user_info(http_client=http_client, id=id, address=address)
                            id += 1
                            self.save_id(id)

                            upgrade_storage_result = await self.upgrade_boat_if_possible(http_client=http_client, id=id, user_id=user_id, user_info=user_info, balance_info=balance_info)
                            user_info = await self.user_info(http_client=http_client, id=id, address=address)
                            id += 1
                            self.save_id(id)

                        sleep_time = self.get_next_claim_time_sleep(user_info=user_info)
                        if sleep_time <= 0:
                            sleep_time = settings.DEFAULT_SLEEP

                except InvalidSession as error:
                    raise error

                except Exception as error:
                    logger.error(f"{self.session_name} | Unknown error: {error}")
                    await asyncio.sleep(delay=7)

                else:
                    logger.info(f"{self.session_name} | Sleeping for the next cycle {sleep_time}s")
                    await asyncio.sleep(delay=sleep_time)


async def run_miner(tg_client: Client, proxy: str | None):
    try:
        await Miner(tg_client=tg_client).run(proxy=proxy)
    except InvalidSession:
        logger.error(f"{tg_client.name} | Invalid Session")