import {Buffer} from 'node:buffer'
import {b as Ze} from './func.js'
//import * as fs from 'fs';

function Xi(e, t, n, s) {
    if (!(this instanceof Xi)) return new Xi(e, t, n, s);
    (this.list = s),
        (this.value = e),
        t ? ((t.next = this), (this.prev = t)) : (this.prev = null),
        n ? ((n.prev = this), (this.next = n)) : (this.next = null);
}
var xj = kt;
kt.Node = Xi;
kt.create = kt;
function kt(e) {
    var t = this;
    if (
        (t instanceof kt || (t = new kt()),
            (t.tail = null),
            (t.head = null),
            (t.length = 0),
        e && typeof e.forEach == "function")
    )
        e.forEach(function (r) {
            t.push(r);
        });
    else if (arguments.length > 0)
        for (var n = 0, s = arguments.length; n < s; n++) t.push(arguments[n]);
    return t;
}
kt.prototype.removeNode = function (e) {
    if (e.list !== this)
        throw new Error("removing node which does not belong to this list");
    var t = e.next,
        n = e.prev;
    return (
        t && (t.prev = n),
        n && (n.next = t),
        e === this.head && (this.head = t),
        e === this.tail && (this.tail = n),
            e.list.length--,
            (e.next = null),
            (e.prev = null),
            (e.list = null),
            t
    );
};
kt.prototype.unshiftNode = function (e) {
    if (e !== this.head) {
        e.list && e.list.removeNode(e);
        var t = this.head;
        (e.list = this),
            (e.next = t),
        t && (t.prev = e),
            (this.head = e),
        this.tail || (this.tail = e),
            this.length++;
    }
};
kt.prototype.pushNode = function (e) {
    if (e !== this.tail) {
        e.list && e.list.removeNode(e);
        var t = this.tail;
        (e.list = this),
            (e.prev = t),
        t && (t.next = e),
            (this.tail = e),
        this.head || (this.head = e),
            this.length++;
    }
};
kt.prototype.push = function () {
    for (var e = 0, t = arguments.length; e < t; e++) Tj(this, arguments[e]);
    return this.length;
};
kt.prototype.unshift = function () {
    for (var e = 0, t = arguments.length; e < t; e++) Ij(this, arguments[e]);
    return this.length;
};
kt.prototype.pop = function () {
    if (this.tail) {
        var e = this.tail.value;
        return (
            (this.tail = this.tail.prev),
                this.tail ? (this.tail.next = null) : (this.head = null),
                this.length--,
                e
        );
    }
};
kt.prototype.shift = function () {
    if (this.head) {
        var e = this.head.value;
        return (
            (this.head = this.head.next),
                this.head ? (this.head.prev = null) : (this.tail = null),
                this.length--,
                e
        );
    }
};
kt.prototype.forEach = function (e, t) {
    t = t || this;
    for (var n = this.head, s = 0; n !== null; s++)
        e.call(t, n.value, s, this), (n = n.next);
};
kt.prototype.forEachReverse = function (e, t) {
    t = t || this;
    for (var n = this.tail, s = this.length - 1; n !== null; s--)
        e.call(t, n.value, s, this), (n = n.prev);
};
kt.prototype.get = function (e) {
    for (var t = 0, n = this.head; n !== null && t < e; t++) n = n.next;
    if (t === e && n !== null) return n.value;
};
kt.prototype.getReverse = function (e) {
    for (var t = 0, n = this.tail; n !== null && t < e; t++) n = n.prev;
    if (t === e && n !== null) return n.value;
};
kt.prototype.map = function (e, t) {
    t = t || this;
    for (var n = new kt(), s = this.head; s !== null; )
        n.push(e.call(t, s.value, this)), (s = s.next);
    return n;
};
kt.prototype.mapReverse = function (e, t) {
    t = t || this;
    for (var n = new kt(), s = this.tail; s !== null; )
        n.push(e.call(t, s.value, this)), (s = s.prev);
    return n;
};
kt.prototype.reduce = function (e, t) {
    var n,
        s = this.head;
    if (arguments.length > 1) n = t;
    else if (this.head) (s = this.head.next), (n = this.head.value);
    else throw new TypeError("Reduce of empty list with no initial value");
    for (var r = 0; s !== null; r++) (n = e(n, s.value, r)), (s = s.next);
    return n;
};
kt.prototype.reduceReverse = function (e, t) {
    var n,
        s = this.tail;
    if (arguments.length > 1) n = t;
    else if (this.tail) (s = this.tail.prev), (n = this.tail.value);
    else throw new TypeError("Reduce of empty list with no initial value");
    for (var r = this.length - 1; s !== null; r--)
        (n = e(n, s.value, r)), (s = s.prev);
    return n;
};
kt.prototype.toArray = function () {
    for (var e = new Array(this.length), t = 0, n = this.head; n !== null; t++)
        (e[t] = n.value), (n = n.next);
    return e;
};
kt.prototype.toArrayReverse = function () {
    for (var e = new Array(this.length), t = 0, n = this.tail; n !== null; t++)
        (e[t] = n.value), (n = n.prev);
    return e;
};
kt.prototype.slice = function (e, t) {
    (t = t || this.length),
    t < 0 && (t += this.length),
        (e = e || 0),
    e < 0 && (e += this.length);
    var n = new kt();
    if (t < e || t < 0) return n;
    e < 0 && (e = 0), t > this.length && (t = this.length);
    for (var s = 0, r = this.head; r !== null && s < e; s++) r = r.next;
    for (; r !== null && s < t; s++, r = r.next) n.push(r.value);
    return n;
};
kt.prototype.sliceReverse = function (e, t) {
    (t = t || this.length),
    t < 0 && (t += this.length),
        (e = e || 0),
    e < 0 && (e += this.length);
    var n = new kt();
    if (t < e || t < 0) return n;
    e < 0 && (e = 0), t > this.length && (t = this.length);
    for (var s = this.length, r = this.tail; r !== null && s > t; s--) r = r.prev;
    for (; r !== null && s > e; s--, r = r.prev) n.push(r.value);
    return n;
};
kt.prototype.splice = function (e, t, ...n) {
    e > this.length && (e = this.length - 1), e < 0 && (e = this.length + e);
    for (var s = 0, r = this.head; r !== null && s < e; s++) r = r.next;
    for (var o = [], s = 0; r && s < t; s++)
        o.push(r.value), (r = this.removeNode(r));
    r === null && (r = this.tail),
    r !== this.head && r !== this.tail && (r = r.prev);
    for (var s = 0; s < n.length; s++) r = Aj(this, r, n[s]);
    return o;
};
kt.prototype.reverse = function () {
    for (var e = this.head, t = this.tail, n = e; n !== null; n = n.prev) {
        var s = n.prev;
        (n.prev = n.next), (n.next = s);
    }
    return (this.head = t), (this.tail = e), this;
};

var B = function (C) {
        var u,
            f = new Float64Array(16);
        if (C) for (u = 0; u < C.length; u++) f[u] = C[u];
        return f;
    },
    t = function () {
        throw new Error("no PRNG");
    }

function O(C, u, f, n) {
    (C[u] = (f >> 24) & 255),
        (C[u + 1] = (f >> 16) & 255),
        (C[u + 2] = (f >> 8) & 255),
        (C[u + 3] = f & 255),
        (C[u + 4] = (n >> 24) & 255),
        (C[u + 5] = (n >> 16) & 255),
        (C[u + 6] = (n >> 8) & 255),
        (C[u + 7] = n & 255);
}

var on = [
    1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
    3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
    2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
    310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
    1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
    3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
    264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
    1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
    2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
    3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
    113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
    773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
    1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
    2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
    3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
    3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
    430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
    883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
    1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
    2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
    2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
    3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
    3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
    174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
    685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
    1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
    1607167915, 987167468, 1816402316, 1246189591,
];

var a = B(),
    o = B([1]),
    accountInfo = B([56129, 1]),
    h = B([
        30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505,
        36039, 65139, 11119, 27886, 20995,
    ]),
    d = B([
        61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010,
        6542, 64743, 22239, 55772, 9222,
    ]),
    m = B([
        54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982,
        57905, 49316, 21502, 52590, 14035, 8553,
    ]),
    D = B([
        26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214,
        26214, 26214, 26214, 26214, 26214, 26214,
    ]),
    E = B([
        41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153,
        11085, 57099, 20417, 9344, 11139,
    ]);


function UM(e) {
    return Hs(e) && typeof e[Symbol.iterator] == "function";
}
function VM(e, t, n, s) {
    if (e === !0) return;
    e === !1 ? (e = {}) : typeof e == "string" && (e = { message: e });
    const { path: r, branch: o } = t,
        { type: i } = n,
        {
            refinement: a,
            message:
                c = `Expected a value of type \`${i}\`${a ? ` with refinement \`${a}\`` : ""}, but received: \`${$n(s)}\``,
        } = e;
    return {
        value: s,
        type: i,
        refinement: a,
        key: r[r.length - 1],
        path: r,
        branch: o,
        ...e,
        message: c,
    };
}
function* n4(e, t, n, s) {
    UM(e) || (e = [e]);
    for (const r of e) {
        const o = VM(r, t, n, s);
        o && (yield o);
    }
}
function* zp(e, t, n = {}) {
    const { path: s = [], branch: r = [e], coerce: o = !1, mask: i = !1 } = n,
        a = { path: s, branch: r };
    if (
        o &&
        ((e = t.coercer(e, a)),
        i && t.type !== "type" && Hs(t.schema) && Hs(e) && !Array.isArray(e))
    )
        for (const l in e) t.schema[l] === void 0 && delete e[l];
    let c = "valid";
    for (const l of t.validator(e, a))
        (l.explanation = n.message), (c = "not_valid"), yield [l, void 0];
    for (let [l, u, f] of t.entries(e, a)) {
        const h = zp(u, f, {
            path: l === void 0 ? s : [...s, l],
            branch: l === void 0 ? r : [...r, u],
            coerce: o,
            mask: i,
            message: n.message,
        });
        for (const g of h)
            g[0]
                ? ((c = g[0].refinement != null ? "not_refined" : "not_valid"),
                    yield [g[0], void 0])
                : o &&
                ((u = g[1]),
                    l === void 0
                        ? (e = u)
                        : e instanceof Map
                            ? e.set(l, u)
                            : e instanceof Set
                                ? e.add(u)
                                : Hs(e) && (u !== void 0 || l in e) && (e[l] = u));
    }
    if (c !== "not_valid")
        for (const l of t.refiner(e, a))
            (l.explanation = n.message), (c = "not_refined"), yield [l, void 0];
    c === "valid" && (yield [void 0, e]);
}

function V1(e, t, n) {
    const s = gc(e, t, { message: n });
    if (s[0]) throw s[0];
}
function O_(e, t, n) {
    const s = gc(e, t, { coerce: !0, message: n });
    if (s[0]) throw s[0];
    return s[1];
}
function ho(e, t) {
    return !gc(e, t)[0];
}

function P_(e, t, n) {
    const s = gc(e, t, { coerce: !0, mask: !0, message: n });
    if (s[0]) throw s[0];
    return s[1];
}
class Cn {
    constructor(t) {
        const {type: n, schema: s, validator: o, refiner: r, coercer: i=c=>c, entries: a=function*() {}
        } = t;
        this.type = n,
            this.schema = s,
            this.entries = a,
            this.coercer = i,
            o ? this.validator = (c,l)=>{
                    const u = o(c, l);
                    return n4(u, l, this, c)
                }
                : this.validator = ()=>[],
            r ? this.refiner = (c,l)=>{
                    const u = r(c, l);
                    return n4(u, l, this, c)
                }
                : this.refiner = ()=>[]
    }
    assert(t, n) {
        return V1(t, this, n)
    }
    create(t, n) {
        return O_(t, this, n)
    }
    is(t) {
        return ho(t, this)
    }
    mask(t, n) {
        return P_(t, this, n)
    }
    validate(t, n={}) {
        return gc(t, this, n)
    }
}
function Ccccn(C, u, f, n) {
    for (
        var c = new Int32Array(16),
            x = new Int32Array(16),
            y,
            R,
            M,
            z,
            H,
            be,
            K,
            te,
            re,
            fe,
            le,
            se,
            ae,
            ie,
            Q,
            Z,
            U,
            V,
            q,
            N,
            w,
            A,
            j,
            k,
            F,
            P,
            ee = C[0],
            ue = C[1],
            de = C[2],
            ce = C[3],
            p = C[4],
            me = C[5],
            we = C[6],
            Ae = C[7],
            pe = u[0],
            xe = u[1],
            ge = u[2],
            Te = u[3],
            ke = u[4],
            Pe = u[5],
            Me = u[6],
            Ge = u[7],
            Je = 0;
        n >= 128;

    ) {
        for (q = 0; q < 16; q++)
            (N = 8 * q + Je),
                (c[q] =
                    (f[N + 0] << 24) | (f[N + 1] << 16) | (f[N + 2] << 8) | f[N + 3]),
                (x[q] =
                    (f[N + 4] << 24) | (f[N + 5] << 16) | (f[N + 6] << 8) | f[N + 7]);
        for (q = 0; q < 80; q++)
            if (
                ((y = ee),
                    (R = ue),
                    (M = de),
                    (z = ce),
                    (H = p),
                    (be = me),
                    (K = we),
                    (te = Ae),
                    (re = pe),
                    (fe = xe),
                    (le = ge),
                    (se = Te),
                    (ae = ke),
                    (ie = Pe),
                    (Q = Me),
                    (Z = Ge),
                    (w = Ae),
                    (A = Ge),
                    (j = A & 65535),
                    (k = A >>> 16),
                    (F = w & 65535),
                    (P = w >>> 16),
                    (w =
                        ((p >>> 14) | (ke << 18)) ^
                        ((p >>> 18) | (ke << 14)) ^
                        ((ke >>> 9) | (p << 23))),
                    (A =
                        ((ke >>> 14) | (p << 18)) ^
                        ((ke >>> 18) | (p << 14)) ^
                        ((p >>> 9) | (ke << 23))),
                    (j += A & 65535),
                    (k += A >>> 16),
                    (F += w & 65535),
                    (P += w >>> 16),
                    (w = (p & me) ^ (~p & we)),
                    (A = (ke & Pe) ^ (~ke & Me)),
                    (j += A & 65535),
                    (k += A >>> 16),
                    (F += w & 65535),
                    (P += w >>> 16),
                    (w = on[q * 2]),
                    (A = on[q * 2 + 1]),
                    (j += A & 65535),
                    (k += A >>> 16),
                    (F += w & 65535),
                    (P += w >>> 16),
                    (w = c[q % 16]),
                    (A = x[q % 16]),
                    (j += A & 65535),
                    (k += A >>> 16),
                    (F += w & 65535),
                    (P += w >>> 16),
                    (k += j >>> 16),
                    (F += k >>> 16),
                    (P += F >>> 16),
                    (U = (F & 65535) | (P << 16)),
                    (V = (j & 65535) | (k << 16)),
                    (w = U),
                    (A = V),
                    (j = A & 65535),
                    (k = A >>> 16),
                    (F = w & 65535),
                    (P = w >>> 16),
                    (w =
                        ((ee >>> 28) | (pe << 4)) ^
                        ((pe >>> 2) | (ee << 30)) ^
                        ((pe >>> 7) | (ee << 25))),
                    (A =
                        ((pe >>> 28) | (ee << 4)) ^
                        ((ee >>> 2) | (pe << 30)) ^
                        ((ee >>> 7) | (pe << 25))),
                    (j += A & 65535),
                    (k += A >>> 16),
                    (F += w & 65535),
                    (P += w >>> 16),
                    (w = (ee & ue) ^ (ee & de) ^ (ue & de)),
                    (A = (pe & xe) ^ (pe & ge) ^ (xe & ge)),
                    (j += A & 65535),
                    (k += A >>> 16),
                    (F += w & 65535),
                    (P += w >>> 16),
                    (k += j >>> 16),
                    (F += k >>> 16),
                    (P += F >>> 16),
                    (te = (F & 65535) | (P << 16)),
                    (Z = (j & 65535) | (k << 16)),
                    (w = z),
                    (A = se),
                    (j = A & 65535),
                    (k = A >>> 16),
                    (F = w & 65535),
                    (P = w >>> 16),
                    (w = U),
                    (A = V),
                    (j += A & 65535),
                    (k += A >>> 16),
                    (F += w & 65535),
                    (P += w >>> 16),
                    (k += j >>> 16),
                    (F += k >>> 16),
                    (P += F >>> 16),
                    (z = (F & 65535) | (P << 16)),
                    (se = (j & 65535) | (k << 16)),
                    (ue = y),
                    (de = R),
                    (ce = M),
                    (p = z),
                    (me = H),
                    (we = be),
                    (Ae = K),
                    (ee = te),
                    (xe = re),
                    (ge = fe),
                    (Te = le),
                    (ke = se),
                    (Pe = ae),
                    (Me = ie),
                    (Ge = Q),
                    (pe = Z),
                    q % 16 === 15)
            )
                for (N = 0; N < 16; N++)
                    (w = c[N]),
                        (A = x[N]),
                        (j = A & 65535),
                        (k = A >>> 16),
                        (F = w & 65535),
                        (P = w >>> 16),
                        (w = c[(N + 9) % 16]),
                        (A = x[(N + 9) % 16]),
                        (j += A & 65535),
                        (k += A >>> 16),
                        (F += w & 65535),
                        (P += w >>> 16),
                        (U = c[(N + 1) % 16]),
                        (V = x[(N + 1) % 16]),
                        (w =
                            ((U >>> 1) | (V << 31)) ^
                            ((U >>> 8) | (V << 24)) ^
                            (U >>> 7)),
                        (A =
                            ((V >>> 1) | (U << 31)) ^
                            ((V >>> 8) | (U << 24)) ^
                            ((V >>> 7) | (U << 25))),
                        (j += A & 65535),
                        (k += A >>> 16),
                        (F += w & 65535),
                        (P += w >>> 16),
                        (U = c[(N + 14) % 16]),
                        (V = x[(N + 14) % 16]),
                        (w =
                            ((U >>> 19) | (V << 13)) ^
                            ((V >>> 29) | (U << 3)) ^
                            (U >>> 6)),
                        (A =
                            ((V >>> 19) | (U << 13)) ^
                            ((U >>> 29) | (V << 3)) ^
                            ((V >>> 6) | (U << 26))),
                        (j += A & 65535),
                        (k += A >>> 16),
                        (F += w & 65535),
                        (P += w >>> 16),
                        (k += j >>> 16),
                        (F += k >>> 16),
                        (P += F >>> 16),
                        (c[N] = (F & 65535) | (P << 16)),
                        (x[N] = (j & 65535) | (k << 16));
        (w = ee),
            (A = pe),
            (j = A & 65535),
            (k = A >>> 16),
            (F = w & 65535),
            (P = w >>> 16),
            (w = C[0]),
            (A = u[0]),
            (j += A & 65535),
            (k += A >>> 16),
            (F += w & 65535),
            (P += w >>> 16),
            (k += j >>> 16),
            (F += k >>> 16),
            (P += F >>> 16),
            (C[0] = ee = (F & 65535) | (P << 16)),
            (u[0] = pe = (j & 65535) | (k << 16)),
            (w = ue),
            (A = xe),
            (j = A & 65535),
            (k = A >>> 16),
            (F = w & 65535),
            (P = w >>> 16),
            (w = C[1]),
            (A = u[1]),
            (j += A & 65535),
            (k += A >>> 16),
            (F += w & 65535),
            (P += w >>> 16),
            (k += j >>> 16),
            (F += k >>> 16),
            (P += F >>> 16),
            (C[1] = ue = (F & 65535) | (P << 16)),
            (u[1] = xe = (j & 65535) | (k << 16)),
            (w = de),
            (A = ge),
            (j = A & 65535),
            (k = A >>> 16),
            (F = w & 65535),
            (P = w >>> 16),
            (w = C[2]),
            (A = u[2]),
            (j += A & 65535),
            (k += A >>> 16),
            (F += w & 65535),
            (P += w >>> 16),
            (k += j >>> 16),
            (F += k >>> 16),
            (P += F >>> 16),
            (C[2] = de = (F & 65535) | (P << 16)),
            (u[2] = ge = (j & 65535) | (k << 16)),
            (w = ce),
            (A = Te),
            (j = A & 65535),
            (k = A >>> 16),
            (F = w & 65535),
            (P = w >>> 16),
            (w = C[3]),
            (A = u[3]),
            (j += A & 65535),
            (k += A >>> 16),
            (F += w & 65535),
            (P += w >>> 16),
            (k += j >>> 16),
            (F += k >>> 16),
            (P += F >>> 16),
            (C[3] = ce = (F & 65535) | (P << 16)),
            (u[3] = Te = (j & 65535) | (k << 16)),
            (w = p),
            (A = ke),
            (j = A & 65535),
            (k = A >>> 16),
            (F = w & 65535),
            (P = w >>> 16),
            (w = C[4]),
            (A = u[4]),
            (j += A & 65535),
            (k += A >>> 16),
            (F += w & 65535),
            (P += w >>> 16),
            (k += j >>> 16),
            (F += k >>> 16),
            (P += F >>> 16),
            (C[4] = p = (F & 65535) | (P << 16)),
            (u[4] = ke = (j & 65535) | (k << 16)),
            (w = me),
            (A = Pe),
            (j = A & 65535),
            (k = A >>> 16),
            (F = w & 65535),
            (P = w >>> 16),
            (w = C[5]),
            (A = u[5]),
            (j += A & 65535),
            (k += A >>> 16),
            (F += w & 65535),
            (P += w >>> 16),
            (k += j >>> 16),
            (F += k >>> 16),
            (P += F >>> 16),
            (C[5] = me = (F & 65535) | (P << 16)),
        (u[5] = Pe = (j & 65535) | (k << 16)),
        (w = we),
        (A = Me),
        (j = A & 65535),
        (k = A >>> 16),
        (F = w & 65535),
        (P = w >>> 16),
        (w = C[6]),
        (A = u[6]),
        (j += A & 65535),
        (k += A >>> 16),
        (F += w & 65535),
        (P += w >>> 16),
        (k += j >>> 16),
        (F += k >>> 16),
        (P += F >>> 16),
        (C[6] = we = (F & 65535) | (P << 16)),
        (u[6] = Me = (j & 65535) | (k << 16)),
        (w = Ae),
        (A = Ge),
        (j = A & 65535),
        (k = A >>> 16),
        (F = w & 65535),
        (P = w >>> 16),
        (w = C[7]),
        (A = u[7]),
        (j += A & 65535),
        (k += A >>> 16),
        (F += w & 65535),
        (P += w >>> 16),
        (k += j >>> 16),
        (F += k >>> 16),
        (P += F >>> 16),
        (C[7] = Ae = (F & 65535) | (P << 16)),
        (u[7] = Ge = (j & 65535) | (k << 16)),
        (Je += 128),
        (n -= 128);
    }
    return n;
}

function kB(C, u, f) {
    var n = new Int32Array(8),
        c = new Int32Array(8),
        x = new Uint8Array(256),
        y,
        R = f;
    for (
        n[0] = 1779033703,
            n[1] = 3144134277,
            n[2] = 1013904242,
            n[3] = 2773480762,
            n[4] = 1359893119,
            n[5] = 2600822924,
            n[6] = 528734635,
            n[7] = 1541459225,
            c[0] = 4089235720,
            c[1] = 2227873595,
            c[2] = 4271175723,
            c[3] = 1595750129,
            c[4] = 2917565137,
            c[5] = 725511199,
            c[6] = 4215389547,
            c[7] = 327033209,
            Ccccn(n, c, u, f),
            f %= 128,
            y = 0;
        y < f;
        y++
    )
        x[y] = u[R - f + y];
    for (
        x[f] = 128,
            f = 256 - 128 * (f < 112 ? 1 : 0),
            x[f - 9] = 0,
            O(x, f - 8, (R / 536870912) | 0, R << 3),
            Ccccn(n, c, x, f),
            y = 0;
        y < 8;
        y++
    )
        O(C, 8 * y, n[y], c[y]);
    return 0;
}

function Ne1(C, u) {
    var f;
    for (f = 0; f < 16; f++) C[f] = u[f] | 0;
}
function Se(C, u) {
    Be(C, u, u);
}
function Ve(C, u) {
    var f = B(),
        n;
    for (n = 0; n < 16; n++) f[n] = u[n];
    for (n = 253; n >= 0; n--) Se(f, f), n !== 2 && n !== 4 && Be(f, f, u);
    for (n = 0; n < 16; n++) C[n] = f[n];
}

function Be(C, u, f) {
    var n,
        c,
        x = 0,
        y = 0,
        R = 0,
        M = 0,
        z = 0,
        H = 0,
        be = 0,
        K = 0,
        te = 0,
        re = 0,
        fe = 0,
        le = 0,
        se = 0,
        ae = 0,
        ie = 0,
        Q = 0,
        Z = 0,
        U = 0,
        V = 0,
        q = 0,
        N = 0,
        w = 0,
        A = 0,
        j = 0,
        k = 0,
        F = 0,
        P = 0,
        ee = 0,
        ue = 0,
        de = 0,
        ce = 0,
        p = f[0],
        me = f[1],
        we = f[2],
        Ae = f[3],
        pe = f[4],
        xe = f[5],
        ge = f[6],
        Te = f[7],
        ke = f[8],
        Pe = f[9],
        Me = f[10],
        Ge = f[11],
        Je = f[12],
        qe = f[13],
        ze = f[14],
        We = f[15];
    (n = u[0]),
        (x += n * p),
        (y += n * me),
        (R += n * we),
        (M += n * Ae),
        (z += n * pe),
        (H += n * xe),
        (be += n * ge),
        (K += n * Te),
        (te += n * ke),
        (re += n * Pe),
        (fe += n * Me),
        (le += n * Ge),
        (se += n * Je),
        (ae += n * qe),
        (ie += n * ze),
        (Q += n * We),
        (n = u[1]),
        (y += n * p),
        (R += n * me),
        (M += n * we),
        (z += n * Ae),
        (H += n * pe),
        (be += n * xe),
        (K += n * ge),
        (te += n * Te),
        (re += n * ke),
        (fe += n * Pe),
        (le += n * Me),
        (se += n * Ge),
        (ae += n * Je),
        (ie += n * qe),
        (Q += n * ze),
        (Z += n * We),
        (n = u[2]),
        (R += n * p),
        (M += n * me),
        (z += n * we),
        (H += n * Ae),
        (be += n * pe),
        (K += n * xe),
        (te += n * ge),
        (re += n * Te),
        (fe += n * ke),
        (le += n * Pe),
        (se += n * Me),
        (ae += n * Ge),
        (ie += n * Je),
        (Q += n * qe),
        (Z += n * ze),
        (U += n * We),
        (n = u[3]),
        (M += n * p),
        (z += n * me),
        (H += n * we),
        (be += n * Ae),
        (K += n * pe),
        (te += n * xe),
        (re += n * ge),
        (fe += n * Te),
        (le += n * ke),
        (se += n * Pe),
        (ae += n * Me),
        (ie += n * Ge),
        (Q += n * Je),
        (Z += n * qe),
        (U += n * ze),
        (V += n * We),
        (n = u[4]),
        (z += n * p),
        (H += n * me),
        (be += n * we),
        (K += n * Ae),
        (te += n * pe),
        (re += n * xe),
        (fe += n * ge),
        (le += n * Te),
        (se += n * ke),
        (ae += n * Pe),
        (ie += n * Me),
        (Q += n * Ge),
        (Z += n * Je),
        (U += n * qe),
        (V += n * ze),
        (q += n * We),
        (n = u[5]),
        (H += n * p),
        (be += n * me),
        (K += n * we),
        (te += n * Ae),
        (re += n * pe),
        (fe += n * xe),
        (le += n * ge),
        (se += n * Te),
        (ae += n * ke),
        (ie += n * Pe),
        (Q += n * Me),
        (Z += n * Ge),
        (U += n * Je),
        (V += n * qe),
        (q += n * ze),
    (N += n * We),
    (n = u[6]),
    (be += n * p),
    (K += n * me),
    (te += n * we),
    (re += n * Ae),
    (fe += n * pe),
    (le += n * xe),
    (se += n * ge),
    (ae += n * Te),
    (ie += n * ke),
    (Q += n * Pe),
    (Z += n * Me),
    (U += n * Ge),
    (V += n * Je),
    (q += n * qe),
    (N += n * ze),
    (w += n * We),
    (n = u[7]),
    (K += n * p),
    (te += n * me),
    (re += n * we),
    (fe += n * Ae),
    (le += n * pe),
    (se += n * xe),
    (ae += n * ge),
    (ie += n * Te),
    (Q += n * ke),
    (Z += n * Pe),
    (U += n * Me),
    (V += n * Ge),
    (q += n * Je),
    (N += n * qe),
    (w += n * ze),
    (A += n * We),
    (n = u[8]),
    (te += n * p),
    (re += n * me),
    (fe += n * we),
    (le += n * Ae),
    (se += n * pe),
    (ae += n * xe),
    (ie += n * ge),
    (Q += n * Te),
    (Z += n * ke),
    (U += n * Pe),
    (V += n * Me),
    (q += n * Ge),
    (N += n * Je),
    (w += n * qe),
    (A += n * ze),
    (j += n * We),
    (n = u[9]),
    (re += n * p),
    (fe += n * me),
    (le += n * we),
    (se += n * Ae),
    (ae += n * pe),
    (ie += n * xe),
    (Q += n * ge),
    (Z += n * Te),
    (U += n * ke),
    (V += n * Pe),
    (q += n * Me),
    (N += n * Ge),
    (w += n * Je),
    (A += n * qe),
    (j += n * ze),
    (k += n * We),
    (n = u[10]),
    (fe += n * p),
    (le += n * me),
    (se += n * we),
    (ae += n * Ae),
    (ie += n * pe),
    (Q += n * xe),
    (Z += n * ge),
    (U += n * Te),
    (V += n * ke),
    (q += n * Pe),
    (N += n * Me),
    (w += n * Ge),
    (A += n * Je),
    (j += n * qe),
    (k += n * ze),
    (F += n * We),
    (n = u[11]),
    (le += n * p),
    (se += n * me),
    (ae += n * we),
    (ie += n * Ae),
    (Q += n * pe),
    (Z += n * xe),
    (U += n * ge),
    (V += n * Te),
    (q += n * ke),
    (N += n * Pe),
    (w += n * Me),
    (A += n * Ge),
    (j += n * Je),
    (k += n * qe),
    (F += n * ze),
    (P += n * We),
    (n = u[12]),
    (se += n * p),
    (ae += n * me),
    (ie += n * we),
    (Q += n * Ae),
    (Z += n * pe),
    (U += n * xe),
    (V += n * ge),
    (q += n * Te),
    (N += n * ke),
    (w += n * Pe),
    (A += n * Me),
    (j += n * Ge),
    (k += n * Je),
    (F += n * qe),
    (P += n * ze),
    (ee += n * We),
    (n = u[13]),
    (ae += n * p),
    (ie += n * me),
    (Q += n * we),
    (Z += n * Ae),
    (U += n * pe),
    (V += n * xe),
    (q += n * ge),
    (N += n * Te),
    (w += n * ke),
    (A += n * Pe),
    (j += n * Me),
    (k += n * Ge),
    (F += n * Je),
    (P += n * qe),
    (ee += n * ze),
    (ue += n * We),
    (n = u[14]),
    (ie += n * p),
    (Q += n * me),
    (Z += n * we),
    (U += n * Ae),
    (V += n * pe),
    (q += n * xe),
    (N += n * ge),
    (w += n * Te),
    (A += n * ke),
    (j += n * Pe),
    (k += n * Me),
    (F += n * Ge),
    (P += n * Je),
    (ee += n * qe),
    (ue += n * ze),
    (de += n * We),
    (n = u[15]),
    (Q += n * p),
    (Z += n * me),
    (U += n * we),
    (V += n * Ae),
    (q += n * pe),
    (N += n * xe),
    (w += n * ge),
    (A += n * Te),
    (j += n * ke),
    (k += n * Pe),
    (F += n * Me),
    (P += n * Ge),
    (ee += n * Je),
    (ue += n * qe),
    (de += n * ze),
    (ce += n * We),
    (x += 38 * Z),
    (y += 38 * U),
    (R += 38 * V),
    (M += 38 * q),
    (z += 38 * N),
    (H += 38 * w),
    (be += 38 * A),
    (K += 38 * j),
    (te += 38 * k),
    (re += 38 * F),
    (fe += 38 * P),
    (le += 38 * ee),
    (se += 38 * ue),
    (ae += 38 * de),
    (ie += 38 * ce),
    (c = 1),
    (n = x + c + 65535),
    (c = Math.floor(n / 65536)),
    (x = n - c * 65536),
    (n = y + c + 65535),
    (c = Math.floor(n / 65536)),
    (y = n - c * 65536),
    (n = R + c + 65535),
    (c = Math.floor(n / 65536)),
    (R = n - c * 65536),
    (n = M + c + 65535),
    (c = Math.floor(n / 65536)),
    (M = n - c * 65536),
    (n = z + c + 65535),
    (c = Math.floor(n / 65536)),
    (z = n - c * 65536),
    (n = H + c + 65535),
    (c = Math.floor(n / 65536)),
    (H = n - c * 65536),
    (n = be + c + 65535),
    (c = Math.floor(n / 65536)),
    (be = n - c * 65536),
    (n = K + c + 65535),
    (c = Math.floor(n / 65536)),
    (K = n - c * 65536),
    (n = te + c + 65535),
    (c = Math.floor(n / 65536)),
    (te = n - c * 65536),
    (n = re + c + 65535),
    (c = Math.floor(n / 65536)),
    (re = n - c * 65536),
    (n = fe + c + 65535),
    (c = Math.floor(n / 65536)),
    (fe = n - c * 65536),
    (n = le + c + 65535),
    (c = Math.floor(n / 65536)),
    (le = n - c * 65536),
    (n = se + c + 65535),
    (c = Math.floor(n / 65536)),
    (se = n - c * 65536),
    (n = ae + c + 65535),
    (c = Math.floor(n / 65536)),
    (ae = n - c * 65536),
    (n = ie + c + 65535),
    (c = Math.floor(n / 65536)),
    (ie = n - c * 65536),
    (n = Q + c + 65535),
    (c = Math.floor(n / 65536)),
    (Q = n - c * 65536),
    (x += c - 1 + 37 * (c - 1)),
    (c = 1),
    (n = x + c + 65535),
    (c = Math.floor(n / 65536)),
    (x = n - c * 65536),
    (n = y + c + 65535),
    (c = Math.floor(n / 65536)),
    (y = n - c * 65536),
    (n = R + c + 65535),
    (c = Math.floor(n / 65536)),
    (R = n - c * 65536),
    (n = M + c + 65535),
    (c = Math.floor(n / 65536)),
    (M = n - c * 65536),
    (n = z + c + 65535),
    (c = Math.floor(n / 65536)),
    (z = n - c * 65536),
    (n = H + c + 65535),
    (c = Math.floor(n / 65536)),
    (H = n - c * 65536),
    (n = be + c + 65535),
    (c = Math.floor(n / 65536)),
    (be = n - c * 65536),
    (n = K + c + 65535),
    (c = Math.floor(n / 65536)),
    (K = n - c * 65536),
    (n = te + c + 65535),
    (c = Math.floor(n / 65536)),
    (te = n - c * 65536),
    (n = re + c + 65535),
    (c = Math.floor(n / 65536)),
    (re = n - c * 65536),
    (n = fe + c + 65535),
    (c = Math.floor(n / 65536)),
    (fe = n - c * 65536),
    (n = le + c + 65535),
    (c = Math.floor(n / 65536)),
    (le = n - c * 65536),
    (n = se + c + 65535),
    (c = Math.floor(n / 65536)),
    (se = n - c * 65536),
    (n = ae + c + 65535),
    (c = Math.floor(n / 65536)),
    (ae = n - c * 65536),
    (n = ie + c + 65535),
    (c = Math.floor(n / 65536)),
    (ie = n - c * 65536),
    (n = Q + c + 65535),
    (c = Math.floor(n / 65536)),
    (Q = n - c * 65536),
    (x += c - 1 + 37 * (c - 1)),
    (C[0] = x),
    (C[1] = y),
    (C[2] = R),
    (C[3] = M),
    (C[4] = z),
    (C[5] = H),
    (C[6] = be),
    (C[7] = K),
    (C[8] = te),
    (C[9] = re),
    (C[10] = fe),
    (C[11] = le),
    (C[12] = se),
    (C[13] = ae),
    (C[14] = ie),
    (C[15] = Q);
}

function ye(C, u, f) {
    for (var n = 0; n < 16; n++) C[n] = u[n] - f[n];
}

function ve(C, u, f) {
    for (var n = 0; n < 16; n++) C[n] = u[n] + f[n];
}
function bt(C, u) {
    var f = B(),
        n = B(),
        c = B(),
        x = B(),
        y = B(),
        R = B(),
        M = B(),
        z = B(),
        H = B();
    ye(f, C[1], C[0]),
        ye(H, u[1], u[0]),
        Be(f, f, H),
        ve(n, C[0], C[1]),
        ve(H, u[0], u[1]),
        Be(n, n, H),
        Be(c, C[3], u[3]),
        Be(c, c, d),
        Be(x, C[2], u[2]),
        ve(x, x, x),
        ye(y, n, f),
        ye(R, x, c),
        ve(M, x, c),
        ve(z, n, f),
        Be(C[0], y, R),
        Be(C[1], z, M),
        Be(C[2], M, R),
        Be(C[3], y, z);
}

function xB(C, u, f) {
    for (var n, c = ~(f - 1), x = 0; x < 16; x++)
        (n = c & (C[x] ^ u[x])), (C[x] ^= n), (u[x] ^= n);
}

function ln(C, u, f) {
    var n;
    for (n = 0; n < 4; n++) xB(C[n], u[n], f);
}
function mr(C, u, f) {
    var n, c;
    for (
        Ne1(C[0], a), Ne1(C[1], o), Ne1(C[2], o), Ne1(C[3], a), c = 255;
        c >= 0;
        --c
    )
        (n = (f[(c / 8) | 0] >> (c & 7)) & 1),
            ln(C, u, n),
            bt(u, C),
            bt(C, C),
            ln(C, u, n);
}
function wt(C, u) {
    var f = [B(), B(), B(), B()];
    Ne1(f[0], m), Ne1(f[1], D), Ne1(f[2], o), Be(f[3], m, D), mr(C, f, u);
}

function vB(C) {
    var u,
        f,
        n = 1;
    for (u = 0; u < 16; u++)
        (f = C[u] + n + 65535),
            (n = Math.floor(f / 65536)),
            (C[u] = f - n * 65536);
    C[0] += n - 1 + 37 * (n - 1);
}

function gB(C, u) {
    var f,
        n,
        c,
        x = B(),
        y = B();
    for (f = 0; f < 16; f++) y[f] = u[f];
    for (vB(y), vB(y), vB(y), n = 0; n < 2; n++) {
        for (x[0] = y[0] - 65517, f = 1; f < 15; f++)
            (x[f] = y[f] - 65535 - ((x[f - 1] >> 16) & 1)), (x[f - 1] &= 65535);
        (x[15] = y[15] - 32767 - ((x[14] >> 16) & 1)),
            (c = (x[15] >> 16) & 1),
            (x[14] &= 65535),
            xB(y, x, 1 - c);
    }
    for (f = 0; f < 16; f++)
        (C[2 * f] = y[f] & 255), (C[2 * f + 1] = y[f] >> 8);
}

function Ce(C) {
    var u = new Uint8Array(32);
    return gB(u, C), u[0] & 1;
}

function pr(C, u) {
    var f = B(),
        n = B(),
        c = B();
    Ve(c, u[2]),
        Be(f, u[0], c),
        Be(n, u[1], c),
        gB(C, n),
        (C[31] ^= Ce(f) << 7);
}

function Dr(C, u, f) {
    var n = new Uint8Array(64),
        c = [B(), B(), B(), B()],
        x;
    for (
        f || t(u, 32),
            kB(n, u, 32),
            n[0] &= 248,
            n[31] &= 127,
            n[31] |= 64,
            wt(c, n),
            pr(C, c),
            x = 0;
        x < 32;
        x++
    )
        u[x + 32] = C[x];
    return 0;
}
let Oi = {

}
var hB = 64,
    RB = 32,
    MB = 64,
    wr = 32

var At = new Float64Array([
    237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16,
]);

function vr(C, u) {
    var f, n, c, x;
    for (n = 63; n >= 32; --n) {
        for (f = 0, c = n - 32, x = n - 12; c < x; ++c)
            (u[c] += f - 16 * u[n] * At[c - (n - 32)]),
                (f = Math.floor((u[c] + 128) / 256)),
                (u[c] -= f * 256);
        (u[c] += f), (u[n] = 0);
    }
    for (f = 0, c = 0; c < 32; c++)
        (u[c] += f - (u[31] >> 4) * At[c]), (f = u[c] >> 8), (u[c] &= 255);
    for (c = 0; c < 32; c++) u[c] -= f * At[c];
    for (n = 0; n < 32; n++) (u[n + 1] += u[n] >> 8), (C[n] = u[n] & 255);
}


function xr(C) {
    var u = new Float64Array(64),
        f;
    for (f = 0; f < 64; f++) u[f] = C[f];
    for (f = 0; f < 64; f++) C[f] = 0;
    vr(C, u);
}

function fn(C, u, f, n) {
    var c = new Uint8Array(64),
        x = new Uint8Array(64),
        y = new Uint8Array(64),
        R,
        M,
        z = new Float64Array(64),
        H = [B(), B(), B(), B()];
    kB(c, n, 32), (c[0] &= 248), (c[31] &= 127), (c[31] |= 64);
    var be = f + 64;
    for (R = 0; R < f; R++) C[64 + R] = u[R];
    for (R = 0; R < 32; R++) C[32 + R] = c[32 + R];
    for (
        kB(y, C.subarray(32), f + 32), xr(y), wt(H, y), pr(C, H), R = 32;
        R < 64;
        R++
    )
        C[R] = n[R];
    for (kB(x, C, f + 64), xr(x), R = 0; R < 64; R++) z[R] = 0;
    for (R = 0; R < 32; R++) z[R] = y[R];
    for (R = 0; R < 32; R++) for (M = 0; M < 32; M++) z[R + M] += x[R] * c[M];
    return vr(C.subarray(32), z), be;
}

function $e(C, u) {
    var f = B(),
        n;
    for (n = 0; n < 16; n++) f[n] = u[n];
    for (n = 250; n >= 0; n--) Se(f, f), n !== 1 && Be(f, f, u);
    for (n = 0; n < 16; n++) C[n] = f[n];
}

function J(C, u, f, n, c) {
    var x,
        y = 0;
    for (x = 0; x < c; x++) y |= C[u + x] ^ f[n + x];
    return (1 & ((y - 1) >>> 8)) - 1;
}

function v(C, u, f, n) {
    return J(C, u, f, n, 32);
}

function Y(C, u) {
    var f = new Uint8Array(32),
        n = new Uint8Array(32);
    return gB(f, C), gB(n, u), v(f, 0, n, 0);
}

function De(C, u) {
    var f;
    for (f = 0; f < 16; f++) C[f] = u[2 * f] + (u[2 * f + 1] << 8);
    C[15] &= 32767;
}

function bf(C, u) {
    var f = B(),
        n = B(),
        c = B(),
        x = B(),
        y = B(),
        R = B(),
        M = B();
    return (
        Ne1(C[2], o),
            De(C[1], u),
            Se(c, C[1]),
            Be(x, c, h),
            ye(c, c, C[2]),
            ve(x, C[2], x),
            Se(y, x),
            Se(R, y),
            Be(M, R, y),
            Be(f, M, c),
            Be(f, f, x),
            $e(f, f),
            Be(f, f, c),
            Be(f, f, x),
            Be(f, f, x),
            Be(C[0], f, x),
            Se(n, C[0]),
            Be(n, n, x),
        Y(n, c) && Be(C[0], C[0], E),
            Se(n, C[0]),
            Be(n, n, x),
            Y(n, c)
                ? -1
                : (Ce(C[0]) === u[31] >> 7 && ye(C[0], a, C[0]),
                    Be(C[3], C[0], C[1]),
                    0)
    );
}

function gr(C, u, f, n) {
    var c,
        x = new Uint8Array(32),
        y = new Uint8Array(64),
        R = [B(), B(), B(), B()],
        M = [B(), B(), B(), B()];
    if (f < 64 || bf(M, n)) return -1;
    for (c = 0; c < f; c++) C[c] = u[c];
    for (c = 0; c < 32; c++) C[c + 32] = n[c];
    if (
        (kB(y, C, f),
            xr(y),
            mr(R, M, y),
            wt(M, u.subarray(32)),
            bt(R, M),
            pr(x, R),
            (f -= 64),
            v(u, 0, x, 0))
    ) {
        for (c = 0; c < f; c++) C[c] = 0;
        return -1;
    }
    for (c = 0; c < f; c++) C[c] = u[c + 64];
    return f;
}

Oi.sign = function (C, u) {
    if ((tB(C, u), u.length !== MB)) throw new Error("bad secret key size");
    var f = new Uint8Array(hB + C.length);
    return fn(f, C, C.length, u), f;
}
Oi.sign.detached = function (C, u) {
    for (
        var f = Oi.sign(C, u), n = new Uint8Array(hB), c = 0;
        c < n.length;
        c++
    )
        n[c] = f[c];
    return n;
}
Oi.sign.keyPair = function () {
    var C = new Uint8Array(RB),
        u = new Uint8Array(MB);
    return Dr(C, u), { publicKey: C, secretKey: u };
}
Oi.sign.detached.verify = function (C, u, f) {
    if ((tB(C, u, f), u.length !== hB))
        throw new Error("bad signature size");
    if (f.length !== RB) throw new Error("bad public key size");
    var n = new Uint8Array(hB + C.length),
        c = new Uint8Array(hB + C.length),
        x;
    for (x = 0; x < hB; x++) n[x] = u[x];
    for (x = 0; x < C.length; x++) n[x + hB] = C[x];
    return gr(c, n, n.length, f) >= 0;
}


function tB() {
    for (var C = 0; C < arguments.length; C++)
        if (!(arguments[C] instanceof Uint8Array))
            throw new TypeError("unexpected type, use Uint8Array");
}
Oi.sign.keyPair.fromSeed = function (C) {
    if ((tB(C), C.length !== wr)) throw new Error("bad seed size");
    for (
        var u = new Uint8Array(RB), f = new Uint8Array(MB), n = 0;
        n < 32;
        n++
    )
        f[n] = C[n];
    return Dr(u, f, !0), { publicKey: u, secretKey: f };
}

const a0 = 8192;
function As(e) {
    if (e.length < a0) return btoa(String.fromCharCode(...e));
    let t = "";
    for (var n = 0; n < e.length; n += a0) {
        const s = e.slice(n, n + a0);
        t += String.fromCharCode(...s);
    }
    return btoa(t);
}

function D2(e) {
    let t = [],
        n = 0;
    if (e === 0) return [0];
    for (; e > 0; ) (t[n] = e & 127), (e >>= 7) && (t[n] |= 128), (n += 1);
    return t;
}
function WV(e) {
    let t = 0,
        n = 0,
        s = 0;
    for (;;) {
        let r = e[s];
        if (((s += 1), (t |= (r & 127) << n), !(r & 128))) break;
        n += 7;
    }
    return { value: t, length: s };
}
class Tx {
    constructor(t) {
        (this.bytePosition = 0), (this.dataView = new DataView(t.buffer));
    }
    shift(t) {
        return (this.bytePosition += t), this;
    }
    read8() {
        let t = this.dataView.getUint8(this.bytePosition);
        return this.shift(1), t;
    }
    read16() {
        let t = this.dataView.getUint16(this.bytePosition, !0);
        return this.shift(2), t;
    }
    read32() {
        let t = this.dataView.getUint32(this.bytePosition, !0);
        return this.shift(4), t;
    }
    read64() {
        let t = this.read32(),
            s = this.read32().toString(16) + t.toString(16).padStart(8, "0");
        return BigInt("0x" + s).toString(10);
    }
    read128() {
        let t = BigInt(this.read64()),
            s = BigInt(this.read64()).toString(16) + t.toString(16).padStart(16, "0");
        return BigInt("0x" + s).toString(10);
    }
    read256() {
        let t = BigInt(this.read128()),
            s =
                BigInt(this.read128()).toString(16) + t.toString(16).padStart(32, "0");
        return BigInt("0x" + s).toString(10);
    }
    readBytes(t) {
        let n = this.bytePosition + this.dataView.byteOffset,
            s = new Uint8Array(this.dataView.buffer, n, t);
        return this.shift(t), s;
    }
    readULEB() {
        let t = this.bytePosition + this.dataView.byteOffset,
            n = new Uint8Array(this.dataView.buffer, t),
            { value: s, length: r } = WV(n);
        return this.shift(r), s;
    }
    readVec(t) {
        let n = this.readULEB(),
            s = [];
        for (let r = 0; r < n; r++) s.push(t(this, r, n));
        return s;
    }
}
function qV(e, t) {
    switch (t) {
        case "base58":
            return fu(e);
        case "base64":
            return As(e);
        case "hex":
            return ia(e);
        default:
            throw new Error(
                "Unsupported encoding, supported values are: base64, hex",
            );
    }
}

function dr(e) {
    return Uint8Array.from(atob(e), (t) => t.charCodeAt(0));
}
function GV(e, t) {
    switch (t) {
        case "base58":
            return du(e);
        case "base64":
            return dr(e);
        case "hex":
            return hu(e);
        default:
            throw new Error(
                "Unsupported encoding, supported values are: base64, hex",
            );
    }
}
function Ix(e, t = ["<", ">"]) {
    const [n, s] = t,
        r = [];
    let o = "",
        i = 0;
    for (let a = 0; a < e.length; a++) {
        const c = e[a];
        if ((c === n && i++, c === s && i--, i === 0 && c === ",")) {
            r.push(o.trim()), (o = "");
            continue;
        }
        o += c;
    }
    return r.push(o.trim()), r;
}
class kx {
    constructor({ size: t = 1024, maxSize: n, allocateSize: s = 1024 } = {}) {
        (this.bytePosition = 0),
            (this.size = t),
            (this.maxSize = n || t),
            (this.allocateSize = s),
            (this.dataView = new DataView(new ArrayBuffer(t)));
    }
    ensureSizeOrGrow(t) {
        const n = this.bytePosition + t;
        if (n > this.size) {
            const s = Math.min(this.maxSize, this.size + this.allocateSize);
            if (n > s)
                throw new Error(
                    `Attempting to serialize to BCS, but buffer does not have enough size. Allocated size: ${this.size}, Max size: ${this.maxSize}, Required size: ${n}`,
                );
            this.size = s;
            const r = new ArrayBuffer(this.size);
            new Uint8Array(r).set(new Uint8Array(this.dataView.buffer)),
                (this.dataView = new DataView(r));
        }
    }
    shift(t) {
        return (this.bytePosition += t), this;
    }
    write8(t) {
        return (
            this.ensureSizeOrGrow(1),
                this.dataView.setUint8(this.bytePosition, Number(t)),
                this.shift(1)
        );
    }
    write16(t) {
        return (
            this.ensureSizeOrGrow(2),
                this.dataView.setUint16(this.bytePosition, Number(t), !0),
                this.shift(2)
        );
    }
    write32(t) {
        return (
            this.ensureSizeOrGrow(4),
                this.dataView.setUint32(this.bytePosition, Number(t), !0),
                this.shift(4)
        );
    }
    write64(t) {
        return c0(BigInt(t), 8).forEach((n) => this.write8(n)), this;
    }
    write128(t) {
        return c0(BigInt(t), 16).forEach((n) => this.write8(n)), this;
    }
    write256(t) {
        return c0(BigInt(t), 32).forEach((n) => this.write8(n)), this;
    }
    writeULEB(t) {
        return D2(t).forEach((n) => this.write8(n)), this;
    }
    writeVec(t, n) {
        return (
            this.writeULEB(t.length),
                Array.from(t).forEach((s, r) => n(this, s, r, t.length)),
                this
        );
    }
    *[Symbol.iterator]() {
        for (let t = 0; t < this.bytePosition; t++) yield this.dataView.getUint8(t);
        return this.toBytes();
    }
    toBytes() {
        return new Uint8Array(this.dataView.buffer.slice(0, this.bytePosition));
    }
    toString(t) {
        return qV(this.toBytes(), t);
    }
}
function c0(e, t) {
    let n = new Uint8Array(t),
        s = 0;
    for (; e > 0; )
        (n[s] = Number(e % BigInt(256))), (e = e / BigInt(256)), (s += 1);
    return n;
}
var Lx = (e, t, n) => {
        if (!t.has(e)) throw TypeError("Cannot " + n);
    },
    Qs = (e, t, n) => (
        Lx(e, t, "read from private field"), n ? n.call(e) : t.get(e)
    ),
    K1 = (e, t, n) => {
        if (t.has(e))
            throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, n);
    },
    J1 = (e, t, n, s) => (
        Lx(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n
    ),
    Ca,
    Wc,
    p1,
    Jo;
const Ox = class {
    constructor(e) {
        K1(this, Ca, void 0),
            K1(this, Wc, void 0),
            (this.name = e.name),
            (this.read = e.read),
            (this.serializedSize = e.serializedSize ?? (() => null)),
            J1(this, Ca, e.write),
            J1(
                this,
                Wc,
                e.serialize ??
                ((t, n) => {
                    const s = new kx({ size: this.serializedSize(t) ?? void 0, ...n });
                    return Qs(this, Ca).call(this, t, s), s.toBytes();
                }),
            ),
            (this.validate = e.validate ?? (() => {}));
    }
    write(e, t) {
        this.validate(e), Qs(this, Ca).call(this, e, t);
    }
    serialize(e, t) {
        return this.validate(e), new zV(this, Qs(this, Wc).call(this, e, t));
    }
    parse(e) {
        const t = new Tx(e);
        return this.read(t);
    }
    transform({ name: e, input: t, output: n }) {
        return new Ox({
            name: e ?? this.name,
            read: (s) => n(this.read(s)),
            write: (s, r) => Qs(this, Ca).call(this, t(s), r),
            serializedSize: (s) => this.serializedSize(t(s)),
            serialize: (s, r) => Qs(this, Wc).call(this, t(s), r),
            validate: (s) => this.validate(t(s)),
        });
    }
};
let tr = Ox;
Ca = new WeakMap();
Wc = new WeakMap();
const $x = Symbol.for("@mysten/serialized-bcs");
function F2(e) {
    return !!e && typeof e == "object" && e[$x] === !0;
}
class zV {
    constructor(t, n) {
        K1(this, p1, void 0),
            K1(this, Jo, void 0),
            J1(this, p1, t),
            J1(this, Jo, n);
    }
    get [$x]() {
        return !0;
    }
    toBytes() {
        return Qs(this, Jo);
    }
    toHex() {
        return ia(Qs(this, Jo));
    }
    toBase64() {
        return As(Qs(this, Jo));
    }
    toBase58() {
        return fu(Qs(this, Jo));
    }
    parse() {
        return Qs(this, p1).parse(Qs(this, Jo));
    }
}
p1 = new WeakMap();
Jo = new WeakMap();
function Z1({ size: e, ...t }) {
    return new tr({ ...t, serializedSize: () => e });
}
function l0({ readMethod: e, writeMethod: t, ...n }) {
    return Z1({
        ...n,
        read: (s) => s[e](),
        write: (s, r) => r[t](s),
        validate: (s) => {
            var r;
            if (s < 0 || s > n.maxValue)
                throw new TypeError(
                    `Invalid ${n.name} value: ${s}. Expected value in range 0-${n.maxValue}`,
                );
            (r = n.validate) == null || r.call(n, s);
        },
    });
}

function u0({ readMethod: e, writeMethod: t, ...n }) {
    return Z1({
        ...n,
        read: (s) => s[e](),
        write: (s, r) => r[t](BigInt(s)),
        validate: (s) => {
            var o;
            const r = BigInt(s);
            if (r < 0 || r > n.maxValue)
                throw new TypeError(
                    `Invalid ${n.name} value: ${r}. Expected value in range 0-${n.maxValue}`,
                );
            (o = n.validate) == null || o.call(n, r);
        },
    });
}

function JV({ toBytes: e, fromBytes: t, ...n }) {
    return new tr({
        ...n,
        read: (s) => {
            const r = s.readULEB(),
                o = s.readBytes(r);
            return t(o);
        },
        write: (s, r) => {
            const o = e(s);
            r.writeULEB(o.length);
            for (let i = 0; i < o.length; i++) r.write8(o[i]);
        },
        serialize: (s) => {
            const r = e(s),
                o = D2(r.length),
                i = new Uint8Array(o.length + r.length);
            return i.set(o, 0), i.set(r, o.length), i;
        },
        validate: (s) => {
            var r;
            if (typeof s != "string")
                throw new TypeError(`Invalid ${n.name} value: ${s}. Expected string`);
            (r = n.validate) == null || r.call(n, s);
        },
    });
}

function KV({ serialize: e, ...t }) {
    const n = new tr({
        ...t,
        serialize: e,
        write: (s, r) => {
            for (const o of n.serialize(s).toBytes()) r.write8(o);
        },
    });
    return n;
}
function ZV(e) {
    let t = null;
    function n() {
        return t || (t = e()), t;
    }
    return new tr({
        name: "lazy",
        read: (s) => n().read(s),
        serializedSize: (s) => n().serializedSize(s),
        write: (s, r) => n().write(s, r),
        serialize: (s, r) => n().serialize(s, r).toBytes(),
    });
}

const Ae = {
        u8(e) {
            return l0({
                name: "u8",
                readMethod: "read8",
                writeMethod: "write8",
                size: 1,
                maxValue: 2 ** 8 - 1,
                ...e,
            });
        },
        u16(e) {
            return l0({
                name: "u16",
                readMethod: "read16",
                writeMethod: "write16",
                size: 2,
                maxValue: 2 ** 16 - 1,
                ...e,
            });
        },
        u32(e) {
            return l0({
                name: "u32",
                readMethod: "read32",
                writeMethod: "write32",
                size: 4,
                maxValue: 2 ** 32 - 1,
                ...e,
            });
        },
        u64(e) {
            return u0({
                name: "u64",
                readMethod: "read64",
                writeMethod: "write64",
                size: 8,
                maxValue: 2n ** 64n - 1n,
                ...e,
            });
        },
        u128(e) {
            return u0({
                name: "u128",
                readMethod: "read128",
                writeMethod: "write128",
                size: 16,
                maxValue: 2n ** 128n - 1n,
                ...e,
            });
        },
        u256(e) {
            return u0({
                name: "u256",
                readMethod: "read256",
                writeMethod: "write256",
                size: 32,
                maxValue: 2n ** 256n - 1n,
                ...e,
            });
        },
        bool(e) {
            return Z1({
                name: "bool",
                size: 1,
                read: (t) => t.read8() === 1,
                write: (t, n) => n.write8(t ? 1 : 0),
                ...e,
                validate: (t) => {
                    var n;
                    if (
                        ((n = e == null ? void 0 : e.validate) == null || n.call(e, t),
                        typeof t != "boolean")
                    )
                        throw new TypeError(`Expected boolean, found ${typeof t}`);
                },
            });
        },
        uleb128(e) {
            return KV({
                name: "uleb128",
                read: (t) => t.readULEB(),
                serialize: (t) => Uint8Array.from(D2(t)),
                ...e,
            });
        },
        bytes(e, t) {
            return Z1({
                name: `bytes[${e}]`,
                size: e,
                read: (n) => n.readBytes(e),
                write: (n, s) => {
                    for (let r = 0; r < e; r++) s.write8(n[r] ?? 0);
                },
                ...t,
                validate: (n) => {
                    var s;
                    if (
                        ((s = t == null ? void 0 : t.validate) == null || s.call(t, n),
                            !("length" in n))
                    )
                        throw new TypeError(`Expected array, found ${typeof n}`);
                    if (n.length !== e)
                        throw new TypeError(
                            `Expected array of length ${e}, found ${n.length}`,
                        );
                },
            });
        },
        string(e) {
            return JV({
                name: "string",
                toBytes: (t) => new TextEncoder().encode(t),
                fromBytes: (t) => new TextDecoder().decode(t),
                ...e,
            });
        },
        fixedArray(e, t, n) {
            return new tr({
                name: `${t.name}[${e}]`,
                read: (s) => {
                    const r = new Array(e);
                    for (let o = 0; o < e; o++) r[o] = t.read(s);
                    return r;
                },
                write: (s, r) => {
                    for (const o of s) t.write(o, r);
                },
                ...n,
                validate: (s) => {
                    var r;
                    if (
                        ((r = n == null ? void 0 : n.validate) == null || r.call(n, s),
                            !("length" in s))
                    )
                        throw new TypeError(`Expected array, found ${typeof s}`);
                    if (s.length !== e)
                        throw new TypeError(
                            `Expected array of length ${e}, found ${s.length}`,
                        );
                },
            });
        },
        option(e) {
            return Ae.enum(`Option<${e.name}>`, { None: null, Some: e }).transform({
                input: (t) => (t == null ? { None: !0 } : { Some: t }),
                output: (t) => ("Some" in t ? t.Some : null),
            });
        },
        vector(e, t) {
            return new tr({
                name: `vector<${e.name}>`,
                read: (n) => {
                    const s = n.readULEB(),
                        r = new Array(s);
                    for (let o = 0; o < s; o++) r[o] = e.read(n);
                    return r;
                },
                write: (n, s) => {
                    s.writeULEB(n.length);
                    for (const r of n) e.write(r, s);
                },
                ...t,
                validate: (n) => {
                    var s;
                    if (
                        ((s = t == null ? void 0 : t.validate) == null || s.call(t, n),
                            !("length" in n))
                    )
                        throw new TypeError(`Expected array, found ${typeof n}`);
                },
            });
        },
        tuple(e, t) {
            return new tr({
                name: `(${e.map((n) => n.name).join(", ")})`,
                serializedSize: (n) => {
                    let s = 0;
                    for (let r = 0; r < e.length; r++) {
                        const o = e[r].serializedSize(n[r]);
                        if (o == null) return null;
                        s += o;
                    }
                    return s;
                },
                read: (n) => {
                    const s = [];
                    for (const r of e) s.push(r.read(n));
                    return s;
                },
                write: (n, s) => {
                    for (let r = 0; r < e.length; r++) e[r].write(n[r], s);
                },
                ...t,
                validate: (n) => {
                    var s;
                    if (
                        ((s = t == null ? void 0 : t.validate) == null || s.call(t, n),
                            !Array.isArray(n))
                    )
                        throw new TypeError(`Expected array, found ${typeof n}`);
                    if (n.length !== e.length)
                        throw new TypeError(
                            `Expected array of length ${e.length}, found ${n.length}`,
                        );
                },
            });
        },
        struct(e, t, n) {
            const s = Object.entries(t);
            return new tr({
                name: e,
                serializedSize: (r) => {
                    let o = 0;
                    for (const [i, a] of s) {
                        const c = a.serializedSize(r[i]);
                        if (c == null) return null;
                        o += c;
                    }
                    return o;
                },
                read: (r) => {
                    const o = {};
                    for (const [i, a] of s) o[i] = a.read(r);
                    return o;
                },
                write: (r, o) => {
                    for (const [i, a] of s) a.write(r[i], o);
                },
                ...n,
                validate: (r) => {
                    var o;
                    if (
                        ((o = n == null ? void 0 : n.validate) == null || o.call(n, r),
                        typeof r != "object" || r == null)
                    )
                        throw new TypeError(`Expected object, found ${typeof r}`);
                },
            });
        },
        enum(e, t, n) {
            const s = Object.entries(t);
            return new tr({
                name: e,
                read: (r) => {
                    const o = r.readULEB(),
                        [i, a] = s[o];
                    return { [i]: (a == null ? void 0 : a.read(r)) ?? !0 };
                },
                write: (r, o) => {
                    const [i, a] = Object.entries(r)[0];
                    for (let c = 0; c < s.length; c++) {
                        const [l, u] = s[c];
                        if (l === i) {
                            o.writeULEB(c), u == null || u.write(a, o);
                            return;
                        }
                    }
                },
                ...n,
                validate: (r) => {
                    var a;
                    if (
                        ((a = n == null ? void 0 : n.validate) == null || a.call(n, r),
                        typeof r != "object" || r == null)
                    )
                        throw new TypeError(`Expected object, found ${typeof r}`);
                    const o = Object.keys(r);
                    if (o.length !== 1)
                        throw new TypeError(
                            `Expected object with one key, found ${o.length}`,
                        );
                    const [i] = o;
                    if (!Object.hasOwn(t, i))
                        throw new TypeError(`Invalid enum variant ${i}`);
                },
            });
        },
        map(e, t) {
            return Ae.vector(Ae.tuple([e, t])).transform({
                name: `Map<${e.name}, ${t.name}>`,
                input: (n) => [...n.entries()],
                output: (n) => {
                    const s = new Map();
                    for (const [r, o] of n) s.set(r, o);
                    return s;
                },
            });
        },
        generic(e, t) {
            return (...n) =>
                t(...n).transform({
                    name: `${t.name}<${n.map((s) => s.name).join(", ")}>`,
                    input: (s) => s,
                    output: (s) => s,
                });
        },
        lazy(e) {
            return ZV(e);
        },
    },
    XV = 32,
    qc = class {
        constructor(e) {
            if (((this.types = new Map()), (this.counter = 0), e instanceof qc)) {
                (this.schema = e.schema), (this.types = new Map(e.types));
                return;
            }
            if (
                ((this.schema = e),
                    this.registerAddressType(
                        qc.ADDRESS,
                        e.addressLength,
                        e.addressEncoding,
                    ),
                    this.registerVectorType(e.vectorType),
                e.types && e.types.structs)
            )
                for (let t of Object.keys(e.types.structs))
                    this.registerStructType(t, e.types.structs[t]);
            if (e.types && e.types.enums)
                for (let t of Object.keys(e.types.enums))
                    this.registerEnumType(t, e.types.enums[t]);
            if (e.types && e.types.aliases)
                for (let t of Object.keys(e.types.aliases))
                    this.registerAlias(t, e.types.aliases[t]);
            e.withPrimitives !== !1 && YV(this);
        }
        tempKey() {
            return `bcs-struct-${++this.counter}`;
        }
        ser(e, t, n) {
            if (typeof e == "string" || Array.isArray(e)) {
                const { name: s, params: r } = this.parseTypeName(e);
                return this.getTypeInterface(s).encode(this, t, n, r);
            }
            if (typeof e == "object") {
                const s = this.tempKey();
                return new qc(this).registerStructType(s, e).ser(s, t, n);
            }
            throw new Error(`Incorrect type passed into the '.ser()' function. 
${JSON.stringify(e)}`);
        }
        de(e, t, n) {
            if (typeof t == "string")
                if (n) t = GV(t, n);
                else throw new Error("To pass a string to `bcs.de`, specify encoding");
            if (typeof e == "string" || Array.isArray(e)) {
                const { name: s, params: r } = this.parseTypeName(e);
                return this.getTypeInterface(s).decode(this, t, r);
            }
            if (typeof e == "object") {
                const s = new qc(this),
                    r = this.tempKey();
                return s.registerStructType(r, e).de(r, t, n);
            }
            throw new Error(`Incorrect type passed into the '.de()' function. 
${JSON.stringify(e)}`);
        }
        hasType(e) {
            return this.types.has(e);
        }
        registerAlias(e, t) {
            return this.types.set(e, t), this;
        }
        registerType(e, t, n, s = () => !0) {
            const { name: r, params: o } = this.parseTypeName(e);
            return (
                this.types.set(r, {
                    encode(i, a, c, l) {
                        const u = o.reduce(
                            (f, h, g) => Object.assign(f, { [h]: l[g] }),
                            {},
                        );
                        return this._encodeRaw.call(i, new kx(c), a, l, u);
                    },
                    decode(i, a, c) {
                        const l = o.reduce(
                            (u, f, h) => Object.assign(u, { [f]: c[h] }),
                            {},
                        );
                        return this._decodeRaw.call(i, new Tx(a), c, l);
                    },
                    _encodeRaw(i, a, c, l) {
                        if (s(a)) return t.call(this, i, a, c, l);
                        throw new Error(`Validation failed for type ${r}, data: ${a}`);
                    },
                    _decodeRaw(i, a, c) {
                        return n.call(this, i, a, c);
                    },
                }),
                    this
            );
        }
        registerBcsType(e, t) {
            return (
                this.registerType(
                    e,
                    (n, s, r) => {
                        const o = r.map(
                            (i) =>
                                new tr({
                                    name: String(i),
                                    write: (a, c) => {
                                        const { name: l, params: u } = this.parseTypeName(i),
                                            f = this.getTypeInterface(l),
                                            h = u.reduce(
                                                (g, v, w) => Object.assign(g, { [v]: r[w] }),
                                                {},
                                            );
                                        return f._encodeRaw.call(this, c, a, u, h);
                                    },
                                    read: () => {
                                        throw new Error("Not implemented");
                                    },
                                }),
                        );
                        return t(...o).write(s, n), n;
                    },
                    (n, s) => {
                        const r = s.map(
                            (o) =>
                                new tr({
                                    name: String(o),
                                    write: (i, a) => {
                                        throw new Error("Not implemented");
                                    },
                                    read: (i) => {
                                        const { name: a, params: c } = this.parseTypeName(o),
                                            l = this.getTypeInterface(a),
                                            u = c.reduce(
                                                (f, h, g) => Object.assign(f, { [h]: s[g] }),
                                                {},
                                            );
                                        return l._decodeRaw.call(this, i, c, u);
                                    },
                                }),
                        );
                        return t(...r).read(n);
                    },
                ),
                    this
            );
        }
        registerAddressType(e, t, n = "hex") {
            switch (n) {
                case "base64":
                    return this.registerType(
                        e,
                        function (r, o) {
                            return dr(o).reduce((i, a) => i.write8(a), r);
                        },
                        function (r) {
                            return As(r.readBytes(t));
                        },
                    );
                case "hex":
                    return this.registerType(
                        e,
                        function (r, o) {
                            return hu(o).reduce((i, a) => i.write8(a), r);
                        },
                        function (r) {
                            return ia(r.readBytes(t));
                        },
                    );
                default:
                    throw new Error("Unsupported encoding! Use either hex or base64");
            }
        }
        registerVectorType(e) {
            let { name: t, params: n } = this.parseTypeName(e);
            if (n.length > 1)
                throw new Error("Vector can have only one type parameter; got " + t);
            return this.registerType(
                e,
                function (r, o, i, a) {
                    return r.writeVec(o, (c, l) => {
                        let u = i[0];
                        if (!u)
                            throw new Error(
                                `Incorrect number of type parameters passed a to vector '${e}'`,
                            );
                        let { name: f, params: h } = this.parseTypeName(u);
                        if (this.hasType(f))
                            return this.getTypeInterface(f)._encodeRaw.call(this, c, l, h, a);
                        if (!(f in a))
                            throw new Error(
                                `Unable to find a matching type definition for ${f} in vector; make sure you passed a generic`,
                            );
                        let { name: g, params: v } = this.parseTypeName(a[f]);
                        return this.getTypeInterface(g)._encodeRaw.call(this, c, l, v, a);
                    });
                },
                function (r, o, i) {
                    return r.readVec((a) => {
                        let c = o[0];
                        if (!c)
                            throw new Error(
                                `Incorrect number of type parameters passed to a vector '${e}'`,
                            );
                        let { name: l, params: u } = this.parseTypeName(c);
                        if (this.hasType(l))
                            return this.getTypeInterface(l)._decodeRaw.call(this, a, u, i);
                        if (!(l in i))
                            throw new Error(
                                `Unable to find a matching type definition for ${l} in vector; make sure you passed a generic`,
                            );
                        let { name: f, params: h } = this.parseTypeName(i[l]);
                        return this.getTypeInterface(f)._decodeRaw.call(this, a, h, i);
                    });
                },
            );
        }
        registerStructType(e, t) {
            for (let i in t) {
                let a = this.tempKey(),
                    c = t[i];
                !Array.isArray(c) &&
                typeof c != "string" &&
                ((t[i] = a), this.registerStructType(a, c));
            }
            let n = Object.freeze(t),
                s = Object.keys(n),
                { name: r, params: o } = this.parseTypeName(e);
            return this.registerType(
                e,
                function (a, c, l, u) {
                    if (!c || c.constructor !== Object)
                        throw new Error(`Expected ${r} to be an Object, got: ${c}`);
                    if (l.length !== o.length)
                        throw new Error(
                            `Incorrect number of generic parameters passed; expected: ${o.length}, got: ${l.length}`,
                        );
                    for (let f of s) {
                        if (!(f in c))
                            throw new Error(`Struct ${r} requires field ${f}:${n[f]}`);
                        const { name: h, params: g } = this.parseTypeName(n[f]);
                        if (!o.includes(h))
                            this.getTypeInterface(h)._encodeRaw.call(this, a, c[f], g, u);
                        else {
                            const v = o.indexOf(h);
                            let { name: w, params: S } = this.parseTypeName(l[v]);
                            if (this.hasType(w)) {
                                this.getTypeInterface(w)._encodeRaw.call(this, a, c[f], S, u);
                                continue;
                            }
                            if (!(w in u))
                                throw new Error(
                                    `Unable to find a matching type definition for ${w} in ${r}; make sure you passed a generic`,
                                );
                            let { name: _, params: E } = this.parseTypeName(u[w]);
                            this.getTypeInterface(_)._encodeRaw.call(this, a, c[f], E, u);
                        }
                    }
                    return a;
                },
                function (a, c, l) {
                    if (c.length !== o.length)
                        throw new Error(
                            `Incorrect number of generic parameters passed; expected: ${o.length}, got: ${c.length}`,
                        );
                    let u = {};
                    for (let f of s) {
                        const { name: h, params: g } = this.parseTypeName(n[f]);
                        if (!o.includes(h))
                            u[f] = this.getTypeInterface(h)._decodeRaw.call(this, a, g, l);
                        else {
                            const v = o.indexOf(h);
                            let { name: w, params: S } = this.parseTypeName(c[v]);
                            if (this.hasType(w)) {
                                u[f] = this.getTypeInterface(w)._decodeRaw.call(this, a, S, l);
                                continue;
                            }
                            if (!(w in l))
                                throw new Error(
                                    `Unable to find a matching type definition for ${w} in ${r}; make sure you passed a generic`,
                                );
                            let { name: _, params: E } = this.parseTypeName(l[w]);
                            u[f] = this.getTypeInterface(_)._decodeRaw.call(this, a, E, l);
                        }
                    }
                    return u;
                },
            );
        }
        registerEnumType(e, t) {
            for (let i in t) {
                let a = this.tempKey(),
                    c = t[i];
                c !== null &&
                !Array.isArray(c) &&
                typeof c != "string" &&
                ((t[i] = a), this.registerStructType(a, c));
            }
            let n = Object.freeze(t),
                s = Object.keys(n),
                { name: r, params: o } = this.parseTypeName(e);
            return this.registerType(
                e,
                function (a, c, l, u) {
                    if (!c)
                        throw new Error(`Unable to write enum "${r}", missing data.
Received: "${c}"`);
                    if (typeof c != "object")
                        throw new Error(`Incorrect data passed into enum "${r}", expected object with properties: "${s.join(" | ")}".
Received: "${JSON.stringify(c)}"`);
                    let f = Object.keys(c)[0];
                    if (f === void 0)
                        throw new Error(
                            `Empty object passed as invariant of the enum "${r}"`,
                        );
                    let h = s.indexOf(f);
                    if (h === -1)
                        throw new Error(
                            `Unknown invariant of the enum "${r}", allowed values: "${s.join(" | ")}"; received "${f}"`,
                        );
                    let g = s[h],
                        v = n[g];
                    if ((a.write8(h), v === null)) return a;
                    let w = o.indexOf(v),
                        S = w === -1 ? v : l[w];
                    {
                        let { name: _, params: E } = this.parseTypeName(S);
                        return this.getTypeInterface(_)._encodeRaw.call(
                            this,
                            a,
                            c[f],
                            E,
                            u,
                        );
                    }
                },
                function (a, c, l) {
                    let u = a.readULEB(),
                        f = s[u],
                        h = n[f];
                    if (u === -1)
                        throw new Error(
                            `Decoding type mismatch, expected enum "${r}" invariant index, received "${u}"`,
                        );
                    if (h === null) return { [f]: !0 };
                    let g = o.indexOf(h),
                        v = g === -1 ? h : c[g];
                    {
                        let { name: w, params: S } = this.parseTypeName(v);
                        return {
                            [f]: this.getTypeInterface(w)._decodeRaw.call(this, a, S, l),
                        };
                    }
                },
            );
        }
        getTypeInterface(e) {
            let t = this.types.get(e);
            if (typeof t == "string") {
                let n = [];
                for (; typeof t == "string"; ) {
                    if (n.includes(t))
                        throw new Error(
                            `Recursive definition found: ${n.join(" -> ")} -> ${t}`,
                        );
                    n.push(t), (t = this.types.get(t));
                }
            }
            if (t === void 0) throw new Error(`Type ${e} is not registered`);
            return t;
        }
        parseTypeName(e) {
            if (Array.isArray(e)) {
                let [a, ...c] = e;
                return { name: a, params: c };
            }
            if (typeof e != "string")
                throw new Error(`Illegal type passed as a name of the type: ${e}`);
            let [t, n] = this.schema.genericSeparators || ["<", ">"],
                s = e.indexOf(t),
                r = Array.from(e).reverse().indexOf(n);
            if (s === -1 && r === -1) return { name: e, params: [] };
            if (s === -1 || r === -1)
                throw new Error(`Unclosed generic in name '${e}'`);
            let o = e.slice(0, s),
                i = Ix(e.slice(s + 1, e.length - r - 1), this.schema.genericSeparators);
            return { name: o, params: i };
        }
    };
let tn = qc;
tn.U8 = "u8";
tn.U16 = "u16";
tn.U32 = "u32";
tn.U64 = "u64";
tn.U128 = "u128";
tn.U256 = "u256";
tn.BOOL = "bool";
tn.VECTOR = "vector";
tn.ADDRESS = "address";
tn.STRING = "string";
tn.HEX = "hex-string";
tn.BASE58 = "base58-string";
tn.BASE64 = "base64-string";
function YV(e) {
    e.registerType(
        tn.U8,
        function (t, n) {
            return t.write8(n);
        },
        function (t) {
            return t.read8();
        },
        (t) => t < 256,
    ),
        e.registerType(
            tn.U16,
            function (t, n) {
                return t.write16(n);
            },
            function (t) {
                return t.read16();
            },
            (t) => t < 65536,
        ),
        e.registerType(
            tn.U32,
            function (t, n) {
                return t.write32(n);
            },
            function (t) {
                return t.read32();
            },
            (t) => t <= 4294967296n,
        ),
        e.registerType(
            tn.U64,
            function (t, n) {
                return t.write64(n);
            },
            function (t) {
                return t.read64();
            },
        ),
        e.registerType(
            tn.U128,
            function (t, n) {
                return t.write128(n);
            },
            function (t) {
                return t.read128();
            },
        ),
        e.registerType(
            tn.U256,
            function (t, n) {
                return t.write256(n);
            },
            function (t) {
                return t.read256();
            },
        ),
        e.registerType(
            tn.BOOL,
            function (t, n) {
                return t.write8(n);
            },
            function (t) {
                return t.read8().toString(10) === "1";
            },
        ),
        e.registerType(
            tn.STRING,
            function (t, n) {
                return t.writeVec(Array.from(n), (s, r) => s.write8(r.charCodeAt(0)));
            },
            function (t) {
                return t
                    .readVec((n) => n.read8())
                    .map((n) => String.fromCharCode(Number(n)))
                    .join("");
            },
            (t) => !0,
        ),
        e.registerType(
            tn.HEX,
            function (t, n) {
                return t.writeVec(Array.from(hu(n)), (s, r) => s.write8(r));
            },
            function (t) {
                let n = t.readVec((s) => s.read8());
                return ia(new Uint8Array(n));
            },
        ),
        e.registerType(
            tn.BASE58,
            function (t, n) {
                return t.writeVec(Array.from(du(n)), (s, r) => s.write8(r));
            },
            function (t) {
                let n = t.readVec((s) => s.read8());
                return fu(new Uint8Array(n));
            },
        ),
        e.registerType(
            tn.BASE64,
            function (t, n) {
                return t.writeVec(Array.from(dr(n)), (s, r) => s.write8(r));
            },
            function (t) {
                let n = t.readVec((s) => s.read8());
                return As(new Uint8Array(n));
            },
        );
}

const g1 = 32,
    Vx = "suiprivkey";

function YW({ signature: e, signatureScheme: t, publicKey: n }) {
    if (!n) throw new Error("`publicKey` is required");
    const s = n.toRawBytes(),
        r = new Uint8Array(1 + e.length + s.length);
    return r.set([od[t]]), r.set(e, 1), r.set(s, 1 + e.length), As(r);
}
class eq {
    async signWithIntent(t, n) {
        const s = Nx(n, t),
            r = $l(s, { dkLen: 32 });
        return {
            signature: YW({
                signature: await this.sign(r),
                signatureScheme: this.getKeyScheme(),
                publicKey: this.getPublicKey(),
            }),
            bytes: As(t),
        };
    }
    async signTransactionBlock(t) {
        return this.signWithIntent(t, Rl.TransactionData);
    }
    async signPersonalMessage(t) {
        return this.signWithIntent(
            Ae.vector(Ae.u8()).serialize(t).toBytes(),
            Rl.PersonalMessage,
        );
    }
    toSuiAddress() {
        return this.getPublicKey().toSuiAddress();
    }
}
class tq extends eq {
    export() {
        return { schema: this.getKeyScheme(), privateKey: this.getSecretKey() };
    }
}

let M2 = class {
    clone() {
        return this._cloneInto();
    }
};
function TV(e) {
    const t = (s) => e().update(li(s)).digest(),
        n = e();
    return (
        (t.outputLen = n.outputLen),
            (t.blockLen = n.blockLen),
            (t.create = () => e()),
            t
    );
}

function CV(e) {
    return (
        e instanceof Uint8Array ||
        (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
    );
}
function rd(e, ...t) {
    if (!CV(e)) throw new Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e.length))
        throw new Error(
            `Uint8Array expected of length ${t}, not of length=${e.length}`,
        );
}

function AV(e) {
    if (typeof e != "string")
        throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
    return new Uint8Array(new TextEncoder().encode(e));
}
function li(e) {
    return typeof e == "string" && (e = AV(e)), rd(e), e;
}
function IV(e) {
    const t = (s, r) => e(r).update(li(s)).digest(),
        n = e({});
    return (
        (t.outputLen = n.outputLen),
            (t.blockLen = n.blockLen),
            (t.create = (s) => e(s)),
            t
    );
}

function fl(e) {
    if (!Number.isSafeInteger(e) || e < 0)
        throw new Error(`positive integer expected, not ${e}`);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const z1 =
        (e) =>
            new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)),
    i0 = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength),
    $i = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68,
    wx = (e) =>
        ((e << 24) & 4278190080) |
        ((e << 8) & 16711680) |
        ((e >>> 8) & 65280) |
        ((e >>> 24) & 255),
    io = $i ? (e) => e : (e) => wx(e);

const Ku = BigInt(2 ** 32 - 1),
    Ah = BigInt(32);
function Px(e, t = !1) {
    return t
        ? { h: Number(e & Ku), l: Number((e >> Ah) & Ku) }
        : { h: Number((e >> Ah) & Ku) | 0, l: Number(e & Ku) | 0 };
}
function nW(e, t = !1) {
    let n = new Uint32Array(e.length),
        s = new Uint32Array(e.length);
    for (let r = 0; r < e.length; r++) {
        const { h: o, l: i } = Px(e[r], t);
        [n[r], s[r]] = [o, i];
    }
    return [n, s];
}
const sW = (e, t) => (BigInt(e >>> 0) << Ah) | BigInt(t >>> 0),
    rW = (e, t, n) => e >>> n,
    oW = (e, t, n) => (e << (32 - n)) | (t >>> n),
    iW = (e, t, n) => (e >>> n) | (t << (32 - n)),
    aW = (e, t, n) => (e << (32 - n)) | (t >>> n),
    cW = (e, t, n) => (e << (64 - n)) | (t >>> (n - 32)),
    lW = (e, t, n) => (e >>> (n - 32)) | (t << (64 - n)),
    uW = (e, t) => t,
    fW = (e, t) => e,
    dW = (e, t, n) => (e << n) | (t >>> (32 - n)),
    hW = (e, t, n) => (t << n) | (e >>> (32 - n)),
    pW = (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
    gW = (e, t, n) => (e << (n - 32)) | (t >>> (64 - n));
function mW(e, t, n, s) {
    const r = (t >>> 0) + (s >>> 0);
    return { h: (e + n + ((r / 2 ** 32) | 0)) | 0, l: r | 0 };
}
const _W = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
    bW = (e, t, n, s) => (t + n + s + ((e / 2 ** 32) | 0)) | 0,
    vW = (e, t, n, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (s >>> 0),
    wW = (e, t, n, s, r) => (t + n + s + r + ((e / 2 ** 32) | 0)) | 0,
    yW = (e, t, n, s, r) =>
        (e >>> 0) + (t >>> 0) + (n >>> 0) + (s >>> 0) + (r >>> 0),
    CW = (e, t, n, s, r, o) => (t + n + s + r + o + ((e / 2 ** 32) | 0)) | 0,
    Ke = {
        fromBig: Px,
        split: nW,
        toBig: sW,
        shrSH: rW,
        shrSL: oW,
        rotrSH: iW,
        rotrSL: aW,
        rotrBH: cW,
        rotrBL: lW,
        rotr32H: uW,
        rotr32L: fW,
        rotlSH: dW,
        rotlSL: hW,
        rotlBH: pW,
        rotlBL: gW,
        add: mW,
        add3L: _W,
        add3H: bW,
        add4L: vW,
        add4H: wW,
        add5H: CW,
        add5L: yW,
    },
    An = new Uint32Array([
        4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242,
        1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924,
        4215389547, 528734635, 327033209, 1541459225,
    ]),
    Ne = new Uint32Array(32);

function jo(e, t, n, s, r, o) {
    const i = r[o],
        a = r[o + 1];
    let c = Ne[2 * e],
        l = Ne[2 * e + 1],
        u = Ne[2 * t],
        f = Ne[2 * t + 1],
        h = Ne[2 * n],
        g = Ne[2 * n + 1],
        v = Ne[2 * s],
        w = Ne[2 * s + 1],
        S = Ke.add3L(c, u, i);
    (l = Ke.add3H(S, l, f, a)),
        (c = S | 0),
        ({ Dh: w, Dl: v } = { Dh: w ^ l, Dl: v ^ c }),
        ({ Dh: w, Dl: v } = { Dh: Ke.rotr32H(w, v), Dl: Ke.rotr32L(w, v) }),
        ({ h: g, l: h } = Ke.add(g, h, w, v)),
        ({ Bh: f, Bl: u } = { Bh: f ^ g, Bl: u ^ h }),
        ({ Bh: f, Bl: u } = { Bh: Ke.rotrSH(f, u, 24), Bl: Ke.rotrSL(f, u, 24) }),
        (Ne[2 * e] = c),
        (Ne[2 * e + 1] = l),
        (Ne[2 * t] = u),
        (Ne[2 * t + 1] = f),
        (Ne[2 * n] = h),
        (Ne[2 * n + 1] = g),
        (Ne[2 * s] = v),
        (Ne[2 * s + 1] = w);
}
function Uo(e, t, n, s, r, o) {
    const i = r[o],
        a = r[o + 1];
    let c = Ne[2 * e],
        l = Ne[2 * e + 1],
        u = Ne[2 * t],
        f = Ne[2 * t + 1],
        h = Ne[2 * n],
        g = Ne[2 * n + 1],
        v = Ne[2 * s],
        w = Ne[2 * s + 1],
        S = Ke.add3L(c, u, i);
    (l = Ke.add3H(S, l, f, a)),
        (c = S | 0),
        ({ Dh: w, Dl: v } = { Dh: w ^ l, Dl: v ^ c }),
        ({ Dh: w, Dl: v } = { Dh: Ke.rotrSH(w, v, 16), Dl: Ke.rotrSL(w, v, 16) }),
        ({ h: g, l: h } = Ke.add(g, h, w, v)),
        ({ Bh: f, Bl: u } = { Bh: f ^ g, Bl: u ^ h }),
        ({ Bh: f, Bl: u } = { Bh: Ke.rotrBH(f, u, 63), Bl: Ke.rotrBL(f, u, 63) }),
        (Ne[2 * e] = c),
        (Ne[2 * e + 1] = l),
        (Ne[2 * t] = u),
        (Ne[2 * t + 1] = f),
        (Ne[2 * n] = h),
        (Ne[2 * n + 1] = g),
        (Ne[2 * s] = v),
        (Ne[2 * s + 1] = w);
}
function Qa(e, t = !0) {
    if (e.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && e.finished) throw new Error("Hash#digest() has already been called");
}

function vx(e, t) {
    rd(e);
    const n = t.outputLen;
    if (e.length < n)
        throw new Error(
            `digestInto() expects output buffer of length at least ${n}`,
        );
}

function QV() {
    return {
        genericSeparators: ["<", ">"],
        vectorType: "vector",
        addressLength: XV,
        addressEncoding: "hex",
    };
}
const eW = new Uint8Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13,
    6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1,
    9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4,
    10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5,
    15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7,
    14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2,
    13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6,
    1, 12, 0, 2, 11, 7, 5, 3,
]);
class tW extends M2 {
    constructor(t, n, s = {}, r, o, i) {
        if (
            (super(),
                (this.blockLen = t),
                (this.outputLen = n),
                (this.length = 0),
                (this.pos = 0),
                (this.finished = !1),
                (this.destroyed = !1),
                fl(t),
                fl(n),
                fl(r),
            n < 0 || n > r)
        )
            throw new Error("outputLen bigger than keyLen");
        if (s.key !== void 0 && (s.key.length < 1 || s.key.length > r))
            throw new Error(`key must be up 1..${r} byte long or undefined`);
        if (s.salt !== void 0 && s.salt.length !== o)
            throw new Error(`salt must be ${o} byte long or undefined`);
        if (s.personalization !== void 0 && s.personalization.length !== i)
            throw new Error(`personalization must be ${i} byte long or undefined`);
        this.buffer32 = z1((this.buffer = new Uint8Array(t)));
    }
    update(t) {
        Qa(this);
        const { blockLen: n, buffer: s, buffer32: r } = this;
        t = li(t);
        const o = t.length,
            i = t.byteOffset,
            a = t.buffer;
        for (let c = 0; c < o; ) {
            this.pos === n &&
            ($i || ma(r), this.compress(r, 0, !1), $i || ma(r), (this.pos = 0));
            const l = Math.min(n - this.pos, o - c),
                u = i + c;
            if (l === n && !(u % 4) && c + l < o) {
                const f = new Uint32Array(a, u, Math.floor((o - c) / 4));
                $i || ma(f);
                for (let h = 0; c + n < o; h += r.length, c += n)
                    (this.length += n), this.compress(f, h, !1);
                $i || ma(f);
                continue;
            }
            s.set(t.subarray(c, c + l), this.pos),
                (this.pos += l),
                (this.length += l),
                (c += l);
        }
        return this;
    }
    digestInto(t) {
        Qa(this), vx(t, this);
        const { pos: n, buffer32: s } = this;
        (this.finished = !0),
            this.buffer.subarray(n).fill(0),
        $i || ma(s),
            this.compress(s, 0, !0),
        $i || ma(s);
        const r = z1(t);
        this.get().forEach((o, i) => (r[i] = io(o)));
    }
    digest() {
        const { buffer: t, outputLen: n } = this;
        this.digestInto(t);
        const s = t.slice(0, n);
        return this.destroy(), s;
    }
    _cloneInto(t) {
        const {
            buffer: n,
            length: s,
            finished: r,
            destroyed: o,
            outputLen: i,
            pos: a,
        } = this;
        return (
            t || (t = new this.constructor({ dkLen: i })),
                t.set(...this.get()),
                (t.length = s),
                (t.finished = r),
                (t.destroyed = o),
                (t.outputLen = i),
                t.buffer.set(n),
                (t.pos = a),
                t
        );
    }
}
class SW extends tW {
    constructor(t = {}) {
        super(128, t.dkLen === void 0 ? 64 : t.dkLen, t, 64, 16, 16),
            (this.v0l = An[0] | 0),
            (this.v0h = An[1] | 0),
            (this.v1l = An[2] | 0),
            (this.v1h = An[3] | 0),
            (this.v2l = An[4] | 0),
            (this.v2h = An[5] | 0),
            (this.v3l = An[6] | 0),
            (this.v3h = An[7] | 0),
            (this.v4l = An[8] | 0),
            (this.v4h = An[9] | 0),
            (this.v5l = An[10] | 0),
            (this.v5h = An[11] | 0),
            (this.v6l = An[12] | 0),
            (this.v6h = An[13] | 0),
            (this.v7l = An[14] | 0),
            (this.v7h = An[15] | 0);
        const n = t.key ? t.key.length : 0;
        if (((this.v0l ^= this.outputLen | (n << 8) | 65536 | (1 << 24)), t.salt)) {
            const s = z1(li(t.salt));
            (this.v4l ^= io(s[0])),
                (this.v4h ^= io(s[1])),
                (this.v5l ^= io(s[2])),
                (this.v5h ^= io(s[3]));
        }
        if (t.personalization) {
            const s = z1(li(t.personalization));
            (this.v6l ^= io(s[0])),
                (this.v6h ^= io(s[1])),
                (this.v7l ^= io(s[2])),
                (this.v7h ^= io(s[3]));
        }
        if (t.key) {
            const s = new Uint8Array(this.blockLen);
            s.set(li(t.key)), this.update(s);
        }
    }
    get() {
        let {
            v0l: t,
            v0h: n,
            v1l: s,
            v1h: r,
            v2l: o,
            v2h: i,
            v3l: a,
            v3h: c,
            v4l: l,
            v4h: u,
            v5l: f,
            v5h: h,
            v6l: g,
            v6h: v,
            v7l: w,
            v7h: S,
        } = this;
        return [t, n, s, r, o, i, a, c, l, u, f, h, g, v, w, S];
    }
    set(t, n, s, r, o, i, a, c, l, u, f, h, g, v, w, S) {
        (this.v0l = t | 0),
            (this.v0h = n | 0),
            (this.v1l = s | 0),
            (this.v1h = r | 0),
            (this.v2l = o | 0),
            (this.v2h = i | 0),
            (this.v3l = a | 0),
            (this.v3h = c | 0),
            (this.v4l = l | 0),
            (this.v4h = u | 0),
            (this.v5l = f | 0),
            (this.v5h = h | 0),
            (this.v6l = g | 0),
            (this.v6h = v | 0),
            (this.v7l = w | 0),
            (this.v7h = S | 0);
    }
    compress(t, n, s) {
        this.get().forEach((c, l) => (Ne[l] = c)), Ne.set(An, 16);
        let { h: r, l: o } = Ke.fromBig(BigInt(this.length));
        (Ne[24] = An[8] ^ o),
            (Ne[25] = An[9] ^ r),
        s && ((Ne[28] = ~Ne[28]), (Ne[29] = ~Ne[29]));
        let i = 0;
        const a = eW;
        for (let c = 0; c < 12; c++)
            jo(0, 4, 8, 12, t, n + 2 * a[i++]),
                Uo(0, 4, 8, 12, t, n + 2 * a[i++]),
                jo(1, 5, 9, 13, t, n + 2 * a[i++]),
                Uo(1, 5, 9, 13, t, n + 2 * a[i++]),
                jo(2, 6, 10, 14, t, n + 2 * a[i++]),
                Uo(2, 6, 10, 14, t, n + 2 * a[i++]),
                jo(3, 7, 11, 15, t, n + 2 * a[i++]),
                Uo(3, 7, 11, 15, t, n + 2 * a[i++]),
                jo(0, 5, 10, 15, t, n + 2 * a[i++]),
                Uo(0, 5, 10, 15, t, n + 2 * a[i++]),
                jo(1, 6, 11, 12, t, n + 2 * a[i++]),
                Uo(1, 6, 11, 12, t, n + 2 * a[i++]),
                jo(2, 7, 8, 13, t, n + 2 * a[i++]),
                Uo(2, 7, 8, 13, t, n + 2 * a[i++]),
                jo(3, 4, 9, 14, t, n + 2 * a[i++]),
                Uo(3, 4, 9, 14, t, n + 2 * a[i++]);
        (this.v0l ^= Ne[0] ^ Ne[16]),
            (this.v0h ^= Ne[1] ^ Ne[17]),
            (this.v1l ^= Ne[2] ^ Ne[18]),
            (this.v1h ^= Ne[3] ^ Ne[19]),
            (this.v2l ^= Ne[4] ^ Ne[20]),
            (this.v2h ^= Ne[5] ^ Ne[21]),
            (this.v3l ^= Ne[6] ^ Ne[22]),
            (this.v3h ^= Ne[7] ^ Ne[23]),
            (this.v4l ^= Ne[8] ^ Ne[24]),
            (this.v4h ^= Ne[9] ^ Ne[25]),
            (this.v5l ^= Ne[10] ^ Ne[26]),
            (this.v5h ^= Ne[11] ^ Ne[27]),
            (this.v6l ^= Ne[12] ^ Ne[28]),
            (this.v6h ^= Ne[13] ^ Ne[29]),
            (this.v7l ^= Ne[14] ^ Ne[30]),
            (this.v7h ^= Ne[15] ^ Ne[31]),
            Ne.fill(0);
    }
    destroy() {
        (this.destroyed = !0),
            this.buffer32.fill(0),
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
const $l = IV((e) => new SW(e));
var Pl = {};
Object.defineProperty(Pl, "__esModule", { value: !0 });
Pl.bech32m = Bl = Pl.bech32 = void 0;
const X1 = "qpzry9x8gf2tvdw0s3jn54khce6mua7l",
    Bx = {};
for (let e = 0; e < X1.length; e++) {
    const t = X1.charAt(e);
    Bx[t] = e;
}
function Ra(e) {
    const t = e >> 25;
    return (
        ((e & 33554431) << 5) ^
        (-((t >> 0) & 1) & 996825010) ^
        (-((t >> 1) & 1) & 642813549) ^
        (-((t >> 2) & 1) & 513874426) ^
        (-((t >> 3) & 1) & 1027748829) ^
        (-((t >> 4) & 1) & 705979059)
    );
}
function hv(e) {
    let t = 1;
    for (let n = 0; n < e.length; ++n) {
        const s = e.charCodeAt(n);
        if (s < 33 || s > 126) return "Invalid prefix (" + e + ")";
        t = Ra(t) ^ (s >> 5);
    }
    t = Ra(t);
    for (let n = 0; n < e.length; ++n) {
        const s = e.charCodeAt(n);
        t = Ra(t) ^ (s & 31);
    }
    return t;
}
function j2(e, t, n, s) {
    let r = 0,
        o = 0;
    const i = (1 << n) - 1,
        a = [];
    for (let c = 0; c < e.length; ++c)
        for (r = (r << t) | e[c], o += t; o >= n; ) (o -= n), a.push((r >> o) & i);
    if (s) o > 0 && a.push((r << (n - o)) & i);
    else {
        if (o >= t) return "Excess padding";
        if ((r << (n - o)) & i) return "Non-zero padding";
    }
    return a;
}
function EW(e) {
    return j2(e, 8, 5, !0);
}
function xW(e) {
    const t = j2(e, 5, 8, !1);
    if (Array.isArray(t)) return t;
}
function AW(e) {
    const t = j2(e, 5, 8, !1);
    if (Array.isArray(t)) return t;
    throw new Error(t);
}
function Rx(e) {
    let t;
    e === "bech32" ? (t = 1) : (t = 734539939);
    function n(i, a, c) {
        if (((c = c || 90), i.length + 7 + a.length > c))
            throw new TypeError("Exceeds length limit");
        i = i.toLowerCase();
        let l = hv(i);
        if (typeof l == "string") throw new Error(l);
        let u = i + "1";
        for (let f = 0; f < a.length; ++f) {
            const h = a[f];
            if (h >> 5) throw new Error("Non 5-bit word");
            (l = Ra(l) ^ h), (u += X1.charAt(h));
        }
        for (let f = 0; f < 6; ++f) l = Ra(l);
        l ^= t;
        for (let f = 0; f < 6; ++f) {
            const h = (l >> ((5 - f) * 5)) & 31;
            u += X1.charAt(h);
        }
        return u;
    }
    function s(i, a) {
        if (((a = a || 90), i.length < 8)) return i + " too short";
        if (i.length > a) return "Exceeds length limit";
        const c = i.toLowerCase(),
            l = i.toUpperCase();
        if (i !== c && i !== l) return "Mixed-case string " + i;
        i = c;
        const u = i.lastIndexOf("1");
        if (u === -1) return "No separator character for " + i;
        if (u === 0) return "Missing prefix for " + i;
        const f = i.slice(0, u),
            h = i.slice(u + 1);
        if (h.length < 6) return "Data too short";
        let g = hv(f);
        if (typeof g == "string") return g;
        const v = [];
        for (let w = 0; w < h.length; ++w) {
            const S = h.charAt(w),
                _ = Bx[S];
            if (_ === void 0) return "Unknown character " + S;
            (g = Ra(g) ^ _), !(w + 6 >= h.length) && v.push(_);
        }
        return g !== t ? "Invalid checksum for " + i : { prefix: f, words: v };
    }
    function r(i, a) {
        const c = s(i, a);
        if (typeof c == "object") return c;
    }
    function o(i, a) {
        const c = s(i, a);
        if (typeof c == "object") return c;
        throw new Error(c);
    }
    return {
        decodeUnsafe: r,
        decode: o,
        encode: n,
        toWords: EW,
        fromWordsUnsafe: xW,
        fromWords: AW,
    };
}
var Bl = (Pl.bech32 = Rx("bech32"));
Pl.bech32m = Rx("bech32m");
var Rl = ((e) => (
    (e[(e.TransactionData = 0)] = "TransactionData"),
        (e[(e.TransactionEffects = 1)] = "TransactionEffects"),
        (e[(e.CheckpointSummary = 2)] = "CheckpointSummary"),
        (e[(e.PersonalMessage = 3)] = "PersonalMessage"),
        e
))(Rl || {});

function TW(e) {
    return [e, 0, 0];
}
function Nx(e, t) {
    const n = TW(e),
        s = new Uint8Array(n.length + t.length);
    return s.set(n), s.set(t, n.length), s;
}
const od = { ED25519: 0, Secp256k1: 1, Secp256r1: 2, MultiSig: 3, ZkLogin: 5 },
    IW = { ED25519: 32, Secp256k1: 33, Secp256r1: 33 },
    Mx = {
        0: "ED25519",
        1: "Secp256k1",
        2: "Secp256r1",
        3: "MultiSig",
        5: "ZkLogin",
    },
    kW = 32;
function bn(e) {
    const { prefix: t, words: n } = Bl.decode(e);
    if (t !== Vx) throw new Error("invalid private key prefix");
    const s = new Uint8Array(Bl.fromWords(n)),
        r = s.slice(1);
    return { schema: Mx[s[0]], secretKey: r };
}

function nq(e, t) {
    if (e.length !== g1) throw new Error("Invalid bytes length");
    const n = od[t],
        s = new Uint8Array(e.length + 1);
    return s.set([n]), s.set(e, 1), Bl.encode(Vx, Bl.toWords(s));
}

function Gt(e, t = !1) {
    let n = e.toLowerCase();
    return (
        !t && n.startsWith("0x") && (n = n.slice(2)), `0x${n.padStart(pu * 2, "0")}`
    );
}
const EV = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0"),
);
function yx(e) {
    rd(e);
    let t = "";
    for (let n = 0; n < e.length; n++) t += EV[e[n]];
    return t;
}

const pu = 32;
class mq {
    equals(t) {
        return zx(this.toRawBytes(), t.toRawBytes());
    }
    toBase64() {
        return As(this.toRawBytes());
    }
    toString() {
        throw new Error(
            "`toString` is not implemented on public keys. Use `toBase64()` or `toRawBytes()` instead.",
        );
    }
    toSuiPublicKey() {
        const t = this.toSuiBytes();
        return As(t);
    }
    verifyWithIntent(t, n, s) {
        const r = Nx(s, t),
            o = $l(r, { dkLen: 32 });
        return this.verify(o, n);
    }
    verifyPersonalMessage(t, n) {
        return this.verifyWithIntent(
            Ht.vector(Ht.u8()).serialize(t).toBytes(),
            n,
            Rl.PersonalMessage,
        );
    }
    verifyTransactionBlock(t, n) {
        return this.verifyWithIntent(t, n, Rl.TransactionData);
    }
    toSuiBytes() {
        const t = this.toRawBytes(),
            n = new Uint8Array(t.length + 1);
        return n.set([this.flag()]), n.set(t, 1), n;
    }
    toSuiAddress() {
        return Gt(yx($l(this.toSuiBytes(), { dkLen: 32 })).slice(0, pu * 2));
    }
}
const Th = 32;
class Kx extends mq {
    constructor(t) {
        if (
            (super(),
                typeof t == "string"
                    ? (this.data = dr(t))
                    : t instanceof Uint8Array
                        ? (this.data = t)
                        : (this.data = Uint8Array.from(t)),
            this.data.length !== Th)
        )
            throw new Error(
                `Invalid public key input. Expected ${Th} bytes, got ${this.data.length}`,
            );
    }
    equals(t) {
        return super.equals(t);
    }
    toRawBytes() {
        return this.data;
    }
    flag() {
        return od.ED25519;
    }
    async verify(t, n) {
        let s;
        if (typeof n == "string") {
            const r = QW(n);
            if (r.signatureScheme !== "ED25519")
                throw new Error("Invalid signature scheme");
            if (!zx(this.toRawBytes(), r.publicKey))
                throw new Error("Signature does not match public key");
            s = r.signature;
        } else s = n;
        return Oi.sign.detached.verify(t, s, this.toRawBytes());
    }
}

function gv(e) {
    return !!new RegExp("^m\\/44'\\/784'\\/[0-9]+'\\/[0-9]+'\\/[0-9]+'+$").test(
        e,
    );
}


const h1 = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength),
    Ar = (e, t) => (e << (32 - t)) | (e >>> t),
    cN = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
let oS = class {
    clone() {
        return this._cloneInto();
    }
};
let lS = class extends oS {
    constructor(t, n, s, r) {
        super(),
            (this.blockLen = t),
            (this.outputLen = n),
            (this.padOffset = s),
            (this.isLE = r),
            (this.finished = !1),
            (this.length = 0),
            (this.pos = 0),
            (this.destroyed = !1),
            (this.buffer = new Uint8Array(t)),
            (this.view = h1(this.buffer));
    }
    update(t) {
        D1(this);
        const { view: n, buffer: s, blockLen: r } = this;
        t = El(t);
        const o = t.length;
        for (let i = 0; i < o; ) {
            const a = Math.min(r - this.pos, o - i);
            if (a === r) {
                const c = h1(t);
                for (; r <= o - i; i += r) this.process(c, i);
                continue;
            }
            s.set(t.subarray(i, i + a), this.pos),
                (this.pos += a),
                (i += a),
            this.pos === r && (this.process(n, 0), (this.pos = 0));
        }
        return (this.length += t.length), this.roundClean(), this;
    }
    digestInto(t) {
        D1(this), iN(t, this), (this.finished = !0);
        const { buffer: n, view: s, blockLen: r, isLE: o } = this;
        let { pos: i } = this;
        (n[i++] = 128),
            this.buffer.subarray(i).fill(0),
        this.padOffset > r - i && (this.process(s, 0), (i = 0));
        for (let f = i; f < r; f++) n[f] = 0;
        mN(s, r - 8, BigInt(this.length * 8), o), this.process(s, 0);
        const a = h1(t),
            c = this.outputLen;
        if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
        const l = c / 4,
            u = this.get();
        if (l > u.length) throw new Error("_sha2: outputLen bigger than state");
        for (let f = 0; f < l; f++) a.setUint32(4 * f, u[f], o);
    }
    digest() {
        const { buffer: t, outputLen: n } = this;
        this.digestInto(t);
        const s = t.slice(0, n);
        return this.destroy(), s;
    }
    _cloneInto(t) {
        t || (t = new this.constructor()), t.set(...this.get());
        const {
            blockLen: n,
            buffer: s,
            length: r,
            finished: o,
            destroyed: i,
            pos: a,
        } = this;
        return (
            (t.length = r),
                (t.pos = a),
                (t.finished = o),
                (t.destroyed = i),
            r % n && t.buffer.set(s),
                t
        );
    }
};

const _N = (e, t, n) => (e & t) ^ (~e & n),
    bN = (e, t, n) => (e & t) ^ (e & n) ^ (t & n),
    vN = new Uint32Array([
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
        2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
        1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
        2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
        113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
        1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
        3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
        430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
        1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
        2428436474, 2756734187, 3204031479, 3329325298,
    ]),
    No = new Uint32Array([
        1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
        528734635, 1541459225,
    ]),
    Mo = new Uint32Array(64);

let wN = class extends lS {
    constructor() {
        super(64, 32, 8, !1),
            (this.A = No[0] | 0),
            (this.B = No[1] | 0),
            (this.C = No[2] | 0),
            (this.D = No[3] | 0),
            (this.E = No[4] | 0),
            (this.F = No[5] | 0),
            (this.G = No[6] | 0),
            (this.H = No[7] | 0);
    }
    get() {
        const { A: t, B: n, C: s, D: r, E: o, F: i, G: a, H: c } = this;
        return [t, n, s, r, o, i, a, c];
    }
    set(t, n, s, r, o, i, a, c) {
        (this.A = t | 0),
            (this.B = n | 0),
            (this.C = s | 0),
            (this.D = r | 0),
            (this.E = o | 0),
            (this.F = i | 0),
            (this.G = a | 0),
            (this.H = c | 0);
    }
    process(t, n) {
        for (let f = 0; f < 16; f++, n += 4) Mo[f] = t.getUint32(n, !1);
        for (let f = 16; f < 64; f++) {
            const h = Mo[f - 15],
                g = Mo[f - 2],
                v = Ar(h, 7) ^ Ar(h, 18) ^ (h >>> 3),
                w = Ar(g, 17) ^ Ar(g, 19) ^ (g >>> 10);
            Mo[f] = (w + Mo[f - 7] + v + Mo[f - 16]) | 0;
        }
        let { A: s, B: r, C: o, D: i, E: a, F: c, G: l, H: u } = this;
        for (let f = 0; f < 64; f++) {
            const h = Ar(a, 6) ^ Ar(a, 11) ^ Ar(a, 25),
                g = (u + h + _N(a, c, l) + vN[f] + Mo[f]) | 0,
                w = ((Ar(s, 2) ^ Ar(s, 13) ^ Ar(s, 22)) + bN(s, r, o)) | 0;
            (u = l),
                (l = c),
                (c = a),
                (a = (i + g) | 0),
                (i = o),
                (o = r),
                (r = s),
                (s = (g + w) | 0);
        }
        (s = (s + this.A) | 0),
            (r = (r + this.B) | 0),
            (o = (o + this.C) | 0),
            (i = (i + this.D) | 0),
            (a = (a + this.E) | 0),
            (c = (c + this.F) | 0),
            (l = (l + this.G) | 0),
            (u = (u + this.H) | 0),
            this.set(s, r, o, i, a, c, l, u);
    }
    roundClean() {
        Mo.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
    }
};

const yN = iS(() => new wN()),
    Hu = BigInt(2 ** 32 - 1),
    bh = BigInt(32);
function uS(e, t = !1) {
    return t
        ? { h: Number(e & Hu), l: Number((e >> bh) & Hu) }
        : { h: Number((e >> bh) & Hu) | 0, l: Number(e & Hu) | 0 };
}
function CN(e, t = !1) {
    let n = new Uint32Array(e.length),
        s = new Uint32Array(e.length);
    for (let r = 0; r < e.length; r++) {
        const { h: o, l: i } = uS(e[r], t);
        [n[r], s[r]] = [o, i];
    }
    return [n, s];
}
const SN = (e, t) => (BigInt(e >>> 0) << bh) | BigInt(t >>> 0),
    EN = (e, t, n) => e >>> n,
    xN = (e, t, n) => (e << (32 - n)) | (t >>> n),
    AN = (e, t, n) => (e >>> n) | (t << (32 - n)),
    TN = (e, t, n) => (e << (32 - n)) | (t >>> n),
    IN = (e, t, n) => (e << (64 - n)) | (t >>> (n - 32)),
    kN = (e, t, n) => (e >>> (n - 32)) | (t << (64 - n)),
    LN = (e, t) => t,
    ON = (e, t) => e,
    $N = (e, t, n) => (e << n) | (t >>> (32 - n)),
    PN = (e, t, n) => (t << n) | (e >>> (32 - n)),
    BN = (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
    RN = (e, t, n) => (e << (n - 32)) | (t >>> (64 - n));
function NN(e, t, n, s) {
    const r = (t >>> 0) + (s >>> 0);
    return { h: (e + n + ((r / 2 ** 32) | 0)) | 0, l: r | 0 };
}
const MN = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
    DN = (e, t, n, s) => (t + n + s + ((e / 2 ** 32) | 0)) | 0,
    FN = (e, t, n, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (s >>> 0),
    jN = (e, t, n, s, r) => (t + n + s + r + ((e / 2 ** 32) | 0)) | 0,
    UN = (e, t, n, s, r) =>
        (e >>> 0) + (t >>> 0) + (n >>> 0) + (s >>> 0) + (r >>> 0),
    HN = (e, t, n, s, r, o) => (t + n + s + r + o + ((e / 2 ** 32) | 0)) | 0,
    dt = {
        fromBig: uS,
        split: CN,
        toBig: SN,
        shrSH: EN,
        shrSL: xN,
        rotrSH: AN,
        rotrSL: TN,
        rotrBH: IN,
        rotrBL: kN,
        rotr32H: LN,
        rotr32L: ON,
        rotlSH: $N,
        rotlSL: PN,
        rotlBH: BN,
        rotlBL: RN,
        add: NN,
        add3L: MN,
        add3H: DN,
        add4L: FN,
        add4H: jN,
        add5H: HN,
        add5L: UN,
    },
    [VN, WN] = dt.split(
        [
            "0x428a2f98d728ae22",
            "0x7137449123ef65cd",
            "0xb5c0fbcfec4d3b2f",
            "0xe9b5dba58189dbbc",
            "0x3956c25bf348b538",
            "0x59f111f1b605d019",
            "0x923f82a4af194f9b",
            "0xab1c5ed5da6d8118",
            "0xd807aa98a3030242",
            "0x12835b0145706fbe",
            "0x243185be4ee4b28c",
            "0x550c7dc3d5ffb4e2",
            "0x72be5d74f27b896f",
            "0x80deb1fe3b1696b1",
            "0x9bdc06a725c71235",
            "0xc19bf174cf692694",
            "0xe49b69c19ef14ad2",
            "0xefbe4786384f25e3",
            "0x0fc19dc68b8cd5b5",
            "0x240ca1cc77ac9c65",
            "0x2de92c6f592b0275",
            "0x4a7484aa6ea6e483",
            "0x5cb0a9dcbd41fbd4",
            "0x76f988da831153b5",
            "0x983e5152ee66dfab",
            "0xa831c66d2db43210",
            "0xb00327c898fb213f",
            "0xbf597fc7beef0ee4",
            "0xc6e00bf33da88fc2",
            "0xd5a79147930aa725",
            "0x06ca6351e003826f",
            "0x142929670a0e6e70",
            "0x27b70a8546d22ffc",
            "0x2e1b21385c26c926",
            "0x4d2c6dfc5ac42aed",
            "0x53380d139d95b3df",
            "0x650a73548baf63de",
            "0x766a0abb3c77b2a8",
            "0x81c2c92e47edaee6",
            "0x92722c851482353b",
            "0xa2bfe8a14cf10364",
            "0xa81a664bbc423001",
            "0xc24b8b70d0f89791",
            "0xc76c51a30654be30",
            "0xd192e819d6ef5218",
            "0xd69906245565a910",
            "0xf40e35855771202a",
            "0x106aa07032bbd1b8",
            "0x19a4c116b8d2d0c8",
            "0x1e376c085141ab53",
            "0x2748774cdf8eeb99",
            "0x34b0bcb5e19b48a8",
            "0x391c0cb3c5c95a63",
            "0x4ed8aa4ae3418acb",
            "0x5b9cca4f7763e373",
            "0x682e6ff3d6b2b8a3",
            "0x748f82ee5defb2fc",
            "0x78a5636f43172f60",
            "0x84c87814a1f0ab72",
            "0x8cc702081a6439ec",
            "0x90befffa23631e28",
            "0xa4506cebde82bde9",
            "0xbef9a3f7b2c67915",
            "0xc67178f2e372532b",
            "0xca273eceea26619c",
            "0xd186b8c721c0c207",
            "0xeada7dd6cde0eb1e",
            "0xf57d4f7fee6ed178",
            "0x06f067aa72176fba",
            "0x0a637dc5a2c898a6",
            "0x113f9804bef90dae",
            "0x1b710b35131c471b",
            "0x28db77f523047d84",
            "0x32caab7b40c72493",
            "0x3c9ebe0a15c9bebc",
            "0x431d67c49c100d4c",
            "0x4cc5d4becb3e42b6",
            "0x597f299cfc657e2a",
            "0x5fcb6fab3ad6faec",
            "0x6c44198c4a475817",
        ].map((e) => BigInt(e)),
    ),
    Do = new Uint32Array(80),
    Fo = new Uint32Array(80);
let qN = class extends lS {
    constructor() {
        super(128, 64, 16, !1),
            (this.Ah = 1779033703),
            (this.Al = -205731576),
            (this.Bh = -1150833019),
            (this.Bl = -2067093701),
            (this.Ch = 1013904242),
            (this.Cl = -23791573),
            (this.Dh = -1521486534),
            (this.Dl = 1595750129),
            (this.Eh = 1359893119),
            (this.El = -1377402159),
            (this.Fh = -1694144372),
            (this.Fl = 725511199),
            (this.Gh = 528734635),
            (this.Gl = -79577749),
            (this.Hh = 1541459225),
            (this.Hl = 327033209);
    }
    get() {
        const {
            Ah: t,
            Al: n,
            Bh: s,
            Bl: r,
            Ch: o,
            Cl: i,
            Dh: a,
            Dl: c,
            Eh: l,
            El: u,
            Fh: f,
            Fl: h,
            Gh: g,
            Gl: v,
            Hh: w,
            Hl: S,
        } = this;
        return [t, n, s, r, o, i, a, c, l, u, f, h, g, v, w, S];
    }
    set(t, n, s, r, o, i, a, c, l, u, f, h, g, v, w, S) {
        (this.Ah = t | 0),
            (this.Al = n | 0),
            (this.Bh = s | 0),
            (this.Bl = r | 0),
            (this.Ch = o | 0),
            (this.Cl = i | 0),
            (this.Dh = a | 0),
            (this.Dl = c | 0),
            (this.Eh = l | 0),
            (this.El = u | 0),
            (this.Fh = f | 0),
            (this.Fl = h | 0),
            (this.Gh = g | 0),
            (this.Gl = v | 0),
            (this.Hh = w | 0),
            (this.Hl = S | 0);
    }
    process(t, n) {
        for (let x = 0; x < 16; x++, n += 4)
            (Do[x] = t.getUint32(n)), (Fo[x] = t.getUint32((n += 4)));
        for (let x = 16; x < 80; x++) {
            const T = Do[x - 15] | 0,
                D = Fo[x - 15] | 0,
                $ = dt.rotrSH(T, D, 1) ^ dt.rotrSH(T, D, 8) ^ dt.shrSH(T, D, 7),
                X = dt.rotrSL(T, D, 1) ^ dt.rotrSL(T, D, 8) ^ dt.shrSL(T, D, 7),
                K = Do[x - 2] | 0,
                ee = Fo[x - 2] | 0,
                ge = dt.rotrSH(K, ee, 19) ^ dt.rotrBH(K, ee, 61) ^ dt.shrSH(K, ee, 6),
                fe = dt.rotrSL(K, ee, 19) ^ dt.rotrBL(K, ee, 61) ^ dt.shrSL(K, ee, 6),
                q = dt.add4L(X, fe, Fo[x - 7], Fo[x - 16]),
                R = dt.add4H(q, $, ge, Do[x - 7], Do[x - 16]);
            (Do[x] = R | 0), (Fo[x] = q | 0);
        }
        let {
            Ah: s,
            Al: r,
            Bh: o,
            Bl: i,
            Ch: a,
            Cl: c,
            Dh: l,
            Dl: u,
            Eh: f,
            El: h,
            Fh: g,
            Fl: v,
            Gh: w,
            Gl: S,
            Hh: _,
            Hl: E,
        } = this;
        for (let x = 0; x < 80; x++) {
            const T = dt.rotrSH(f, h, 14) ^ dt.rotrSH(f, h, 18) ^ dt.rotrBH(f, h, 41),
                D = dt.rotrSL(f, h, 14) ^ dt.rotrSL(f, h, 18) ^ dt.rotrBL(f, h, 41),
                $ = (f & g) ^ (~f & w),
                X = (h & v) ^ (~h & S),
                K = dt.add5L(E, D, X, WN[x], Fo[x]),
                ee = dt.add5H(K, _, T, $, VN[x], Do[x]),
                ge = K | 0,
                fe = dt.rotrSH(s, r, 28) ^ dt.rotrBH(s, r, 34) ^ dt.rotrBH(s, r, 39),
                q = dt.rotrSL(s, r, 28) ^ dt.rotrBL(s, r, 34) ^ dt.rotrBL(s, r, 39),
                R = (s & o) ^ (s & a) ^ (o & a),
                F = (r & i) ^ (r & c) ^ (i & c);
            (_ = w | 0),
                (E = S | 0),
                (w = g | 0),
                (S = v | 0),
                (g = f | 0),
                (v = h | 0),
                ({ h: f, l: h } = dt.add(l | 0, u | 0, ee | 0, ge | 0)),
                (l = a | 0),
                (u = c | 0),
                (a = o | 0),
                (c = i | 0),
                (o = s | 0),
                (i = r | 0);
            const O = dt.add3L(ge, q, F);
            (s = dt.add3H(O, ee, fe, R)), (r = O | 0);
        }
        ({ h: s, l: r } = dt.add(this.Ah | 0, this.Al | 0, s | 0, r | 0)),
            ({ h: o, l: i } = dt.add(this.Bh | 0, this.Bl | 0, o | 0, i | 0)),
            ({ h: a, l: c } = dt.add(this.Ch | 0, this.Cl | 0, a | 0, c | 0)),
            ({ h: l, l: u } = dt.add(this.Dh | 0, this.Dl | 0, l | 0, u | 0)),
            ({ h: f, l: h } = dt.add(this.Eh | 0, this.El | 0, f | 0, h | 0)),
            ({ h: g, l: v } = dt.add(this.Fh | 0, this.Fl | 0, g | 0, v | 0)),
            ({ h: w, l: S } = dt.add(this.Gh | 0, this.Gl | 0, w | 0, S | 0)),
            ({ h: _, l: E } = dt.add(this.Hh | 0, this.Hl | 0, _ | 0, E | 0)),
            this.set(s, r, o, i, a, c, l, u, f, h, g, v, w, S, _, E);
    }
    roundClean() {
        Do.fill(0), Fo.fill(0);
    }
    destroy() {
        this.buffer.fill(0),
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
};
const GN = iS(() => new qN());


const uN = {}.toString;
function fN(e, t) {
    if (t !== void 0 && uN.call(t) !== "[object Object]")
        throw new Error("Options should be object or undefined");
    return Object.assign(e, t);
}

function $a(e) {
    if (!Number.isSafeInteger(e) || e < 0)
        throw new Error(`Wrong positive integer: ${e}`);
}
function rS(e) {
    if (typeof e != "function" || typeof e.create != "function")
        throw new Error("Hash should be wrapped by utils.wrapConstructor");
    $a(e.outputLen), $a(e.blockLen);
}

let aS = class extends oS {
    constructor(t, n) {
        super(), (this.finished = !1), (this.destroyed = !1), rS(t);
        const s = El(n);
        if (((this.iHash = t.create()), typeof this.iHash.update != "function"))
            throw new Error("Expected instance of class which extends utils.Hash");
        (this.blockLen = this.iHash.blockLen),
            (this.outputLen = this.iHash.outputLen);
        const r = this.blockLen,
            o = new Uint8Array(r);
        o.set(s.length > r ? t.create().update(s).digest() : s);
        for (let i = 0; i < o.length; i++) o[i] ^= 54;
        this.iHash.update(o), (this.oHash = t.create());
        for (let i = 0; i < o.length; i++) o[i] ^= 106;
        this.oHash.update(o), o.fill(0);
    }
    update(t) {
        return D1(this), this.iHash.update(t), this;
    }
    digestInto(t) {
        D1(this),
            qp(t, this.outputLen),
            (this.finished = !0),
            this.iHash.digestInto(t),
            this.oHash.update(t),
            this.oHash.digestInto(t),
            this.destroy();
    }
    digest() {
        const t = new Uint8Array(this.oHash.outputLen);
        return this.digestInto(t), t;
    }
    _cloneInto(t) {
        t || (t = Object.create(Object.getPrototypeOf(this), {}));
        const {
            oHash: n,
            iHash: s,
            finished: r,
            destroyed: o,
            blockLen: i,
            outputLen: a,
        } = this;
        return (
            (t = t),
                (t.finished = r),
                (t.destroyed = o),
                (t.blockLen = i),
                (t.outputLen = a),
                (t.oHash = n._cloneInto(t.oHash)),
                (t.iHash = s._cloneInto(t.iHash)),
                t
        );
    }
    destroy() {
        (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
    }
};
const cS = (e, t, n) => new aS(e, t).update(n).digest();
cS.create = (e, t) => new aS(e, t);
function hN(e, t, n, s) {
    rS(e);
    const r = fN({ dkLen: 32, asyncTick: 10 }, s),
        { c: o, dkLen: i, asyncTick: a } = r;
    if (($a(o), $a(i), $a(a), o < 1))
        throw new Error("PBKDF2: iterations (c) should be >= 1");
    const c = El(t),
        l = El(n),
        u = new Uint8Array(i),
        f = cS.create(e, c),
        h = f._cloneInto().update(l);
    return { c: o, dkLen: i, asyncTick: a, DK: u, PRF: f, PRFSalt: h };
}

function pN(e, t, n, s, r) {
    return e.destroy(), t.destroy(), s && s.destroy(), r.fill(0), n;
}
function gN(e, t, n, s) {
    const { c: r, dkLen: o, DK: i, PRF: a, PRFSalt: c } = hN(e, t, n, s);
    let l;
    const u = new Uint8Array(4),
        f = h1(u),
        h = new Uint8Array(a.outputLen);
    for (let g = 1, v = 0; v < o; g++, v += a.outputLen) {
        const w = i.subarray(v, v + a.outputLen);
        f.setInt32(0, g, !1),
            (l = c._cloneInto(l)).update(u).digestInto(h),
            w.set(h.subarray(0, w.length));
        for (let S = 1; S < r; S++) {
            a._cloneInto(l).update(h).digestInto(h);
            for (let _ = 0; _ < w.length; _++) w[_] ^= h[_];
        }
    }
    return pN(a, c, i, l, h);
}


const fM = (e) => TS(`mnemonic${e}`);
function dM(e, t = "") {
    return gN(GN, IS(e).nfkd, fM(t), { c: 2048, dkLen: 64 });
}
function sq(e) {
    return dM(e, "");
}

function ia(e) {
    return e.reduce((t, n) => t + n.toString(16).padStart(2, "0"), "");
}
function rq(e) {
    return ia(sq(e));
}


function SV(e) {
    if (typeof e != "function" || typeof e.create != "function")
        throw new Error("Hash should be wrapped by utils.wrapConstructor");
    fl(e.outputLen), fl(e.blockLen);
}
let Wx = class extends M2 {
    constructor(t, n) {
        super(), (this.finished = !1), (this.destroyed = !1), SV(t);
        const s = li(n);
        if (((this.iHash = t.create()), typeof this.iHash.update != "function"))
            throw new Error("Expected instance of class which extends utils.Hash");
        (this.blockLen = this.iHash.blockLen),
            (this.outputLen = this.iHash.outputLen);
        const r = this.blockLen,
            o = new Uint8Array(r);
        o.set(s.length > r ? t.create().update(s).digest() : s);
        for (let i = 0; i < o.length; i++) o[i] ^= 54;
        this.iHash.update(o), (this.oHash = t.create());
        for (let i = 0; i < o.length; i++) o[i] ^= 106;
        this.oHash.update(o), o.fill(0);
    }
    update(t) {
        return Qa(this), this.iHash.update(t), this;
    }
    digestInto(t) {
        Qa(this),
            rd(t, this.outputLen),
            (this.finished = !0),
            this.iHash.digestInto(t),
            this.oHash.update(t),
            this.oHash.digestInto(t),
            this.destroy();
    }
    digest() {
        const t = new Uint8Array(this.oHash.outputLen);
        return this.digestInto(t), t;
    }
    _cloneInto(t) {
        t || (t = Object.create(Object.getPrototypeOf(this), {}));
        const {
            oHash: n,
            iHash: s,
            finished: r,
            destroyed: o,
            blockLen: i,
            outputLen: a,
        } = this;
        return (
            (t = t),
                (t.finished = r),
                (t.destroyed = o),
                (t.blockLen = i),
                (t.outputLen = a),
                (t.oHash = n._cloneInto(t.oHash)),
                (t.iHash = s._cloneInto(t.iHash)),
                t
        );
    }
    destroy() {
        (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
    }
};
const o3 = (e, t, n) => new Wx(e, t).update(n).digest();
o3.create = (e, t) => new Wx(e, t);
function oq(e, t, n, s) {
    if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, n, s);
    const r = BigInt(32),
        o = BigInt(4294967295),
        i = Number((n >> r) & o),
        a = Number(n & o),
        c = s ? 4 : 0,
        l = s ? 0 : 4;
    e.setUint32(t + c, i, s), e.setUint32(t + l, a, s);
}
class iq extends M2 {
    constructor(t, n, s, r) {
        super(),
            (this.blockLen = t),
            (this.outputLen = n),
            (this.padOffset = s),
            (this.isLE = r),
            (this.finished = !1),
            (this.length = 0),
            (this.pos = 0),
            (this.destroyed = !1),
            (this.buffer = new Uint8Array(t)),
            (this.view = i0(this.buffer));
    }
    update(t) {
        Qa(this);
        const { view: n, buffer: s, blockLen: r } = this;
        t = li(t);
        const o = t.length;
        for (let i = 0; i < o; ) {
            const a = Math.min(r - this.pos, o - i);
            if (a === r) {
                const c = i0(t);
                for (; r <= o - i; i += r) this.process(c, i);
                continue;
            }
            s.set(t.subarray(i, i + a), this.pos),
                (this.pos += a),
                (i += a),
            this.pos === r && (this.process(n, 0), (this.pos = 0));
        }
        return (this.length += t.length), this.roundClean(), this;
    }
    digestInto(t) {
        Qa(this), vx(t, this), (this.finished = !0);
        const { buffer: n, view: s, blockLen: r, isLE: o } = this;
        let { pos: i } = this;
        (n[i++] = 128),
            this.buffer.subarray(i).fill(0),
        this.padOffset > r - i && (this.process(s, 0), (i = 0));
        for (let f = i; f < r; f++) n[f] = 0;
        oq(s, r - 8, BigInt(this.length * 8), o), this.process(s, 0);
        const a = i0(t),
            c = this.outputLen;
        if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
        const l = c / 4,
            u = this.get();
        if (l > u.length) throw new Error("_sha2: outputLen bigger than state");
        for (let f = 0; f < l; f++) a.setUint32(4 * f, u[f], o);
    }
    digest() {
        const { buffer: t, outputLen: n } = this;
        this.digestInto(t);
        const s = t.slice(0, n);
        return this.destroy(), s;
    }
    _cloneInto(t) {
        t || (t = new this.constructor()), t.set(...this.get());
        const {
            blockLen: n,
            buffer: s,
            length: r,
            finished: o,
            destroyed: i,
            pos: a,
        } = this;
        return (
            (t.length = r),
                (t.pos = a),
                (t.finished = o),
                (t.destroyed = i),
            r % n && t.buffer.set(s),
                t
        );
    }
}
const [aq, cq] = Ke.split(
        [
            "0x428a2f98d728ae22",
            "0x7137449123ef65cd",
            "0xb5c0fbcfec4d3b2f",
            "0xe9b5dba58189dbbc",
            "0x3956c25bf348b538",
            "0x59f111f1b605d019",
            "0x923f82a4af194f9b",
            "0xab1c5ed5da6d8118",
            "0xd807aa98a3030242",
            "0x12835b0145706fbe",
            "0x243185be4ee4b28c",
            "0x550c7dc3d5ffb4e2",
            "0x72be5d74f27b896f",
            "0x80deb1fe3b1696b1",
            "0x9bdc06a725c71235",
            "0xc19bf174cf692694",
            "0xe49b69c19ef14ad2",
            "0xefbe4786384f25e3",
            "0x0fc19dc68b8cd5b5",
            "0x240ca1cc77ac9c65",
            "0x2de92c6f592b0275",
            "0x4a7484aa6ea6e483",
            "0x5cb0a9dcbd41fbd4",
            "0x76f988da831153b5",
            "0x983e5152ee66dfab",
            "0xa831c66d2db43210",
            "0xb00327c898fb213f",
            "0xbf597fc7beef0ee4",
            "0xc6e00bf33da88fc2",
            "0xd5a79147930aa725",
            "0x06ca6351e003826f",
            "0x142929670a0e6e70",
            "0x27b70a8546d22ffc",
            "0x2e1b21385c26c926",
            "0x4d2c6dfc5ac42aed",
            "0x53380d139d95b3df",
            "0x650a73548baf63de",
            "0x766a0abb3c77b2a8",
            "0x81c2c92e47edaee6",
            "0x92722c851482353b",
            "0xa2bfe8a14cf10364",
            "0xa81a664bbc423001",
            "0xc24b8b70d0f89791",
            "0xc76c51a30654be30",
            "0xd192e819d6ef5218",
            "0xd69906245565a910",
            "0xf40e35855771202a",
            "0x106aa07032bbd1b8",
            "0x19a4c116b8d2d0c8",
            "0x1e376c085141ab53",
            "0x2748774cdf8eeb99",
            "0x34b0bcb5e19b48a8",
            "0x391c0cb3c5c95a63",
            "0x4ed8aa4ae3418acb",
            "0x5b9cca4f7763e373",
            "0x682e6ff3d6b2b8a3",
            "0x748f82ee5defb2fc",
            "0x78a5636f43172f60",
            "0x84c87814a1f0ab72",
            "0x8cc702081a6439ec",
            "0x90befffa23631e28",
            "0xa4506cebde82bde9",
            "0xbef9a3f7b2c67915",
            "0xc67178f2e372532b",
            "0xca273eceea26619c",
            "0xd186b8c721c0c207",
            "0xeada7dd6cde0eb1e",
            "0xf57d4f7fee6ed178",
            "0x06f067aa72176fba",
            "0x0a637dc5a2c898a6",
            "0x113f9804bef90dae",
            "0x1b710b35131c471b",
            "0x28db77f523047d84",
            "0x32caab7b40c72493",
            "0x3c9ebe0a15c9bebc",
            "0x431d67c49c100d4c",
            "0x4cc5d4becb3e42b6",
            "0x597f299cfc657e2a",
            "0x5fcb6fab3ad6faec",
            "0x6c44198c4a475817",
        ].map((e) => BigInt(e)),
    ),
    Ho = new Uint32Array(80),
    Vo = new Uint32Array(80);
class lq extends iq {
    constructor() {
        super(128, 64, 16, !1),
            (this.Ah = 1779033703),
            (this.Al = -205731576),
            (this.Bh = -1150833019),
            (this.Bl = -2067093701),
            (this.Ch = 1013904242),
            (this.Cl = -23791573),
            (this.Dh = -1521486534),
            (this.Dl = 1595750129),
            (this.Eh = 1359893119),
            (this.El = -1377402159),
            (this.Fh = -1694144372),
            (this.Fl = 725511199),
            (this.Gh = 528734635),
            (this.Gl = -79577749),
            (this.Hh = 1541459225),
            (this.Hl = 327033209);
    }
    get() {
        const {
            Ah: t,
            Al: n,
            Bh: s,
            Bl: r,
            Ch: o,
            Cl: i,
            Dh: a,
            Dl: c,
            Eh: l,
            El: u,
            Fh: f,
            Fl: h,
            Gh: g,
            Gl: v,
            Hh: w,
            Hl: S,
        } = this;
        return [t, n, s, r, o, i, a, c, l, u, f, h, g, v, w, S];
    }
    set(t, n, s, r, o, i, a, c, l, u, f, h, g, v, w, S) {
        (this.Ah = t | 0),
            (this.Al = n | 0),
            (this.Bh = s | 0),
            (this.Bl = r | 0),
            (this.Ch = o | 0),
            (this.Cl = i | 0),
            (this.Dh = a | 0),
            (this.Dl = c | 0),
            (this.Eh = l | 0),
            (this.El = u | 0),
            (this.Fh = f | 0),
            (this.Fl = h | 0),
            (this.Gh = g | 0),
            (this.Gl = v | 0),
            (this.Hh = w | 0),
            (this.Hl = S | 0);
    }
    process(t, n) {
        for (let x = 0; x < 16; x++, n += 4)
            (Ho[x] = t.getUint32(n)), (Vo[x] = t.getUint32((n += 4)));
        for (let x = 16; x < 80; x++) {
            const T = Ho[x - 15] | 0,
                D = Vo[x - 15] | 0,
                $ = Ke.rotrSH(T, D, 1) ^ Ke.rotrSH(T, D, 8) ^ Ke.shrSH(T, D, 7),
                X = Ke.rotrSL(T, D, 1) ^ Ke.rotrSL(T, D, 8) ^ Ke.shrSL(T, D, 7),
                K = Ho[x - 2] | 0,
                ee = Vo[x - 2] | 0,
                ge = Ke.rotrSH(K, ee, 19) ^ Ke.rotrBH(K, ee, 61) ^ Ke.shrSH(K, ee, 6),
                fe = Ke.rotrSL(K, ee, 19) ^ Ke.rotrBL(K, ee, 61) ^ Ke.shrSL(K, ee, 6),
                q = Ke.add4L(X, fe, Vo[x - 7], Vo[x - 16]),
                R = Ke.add4H(q, $, ge, Ho[x - 7], Ho[x - 16]);
            (Ho[x] = R | 0), (Vo[x] = q | 0);
        }
        let {
            Ah: s,
            Al: r,
            Bh: o,
            Bl: i,
            Ch: a,
            Cl: c,
            Dh: l,
            Dl: u,
            Eh: f,
            El: h,
            Fh: g,
            Fl: v,
            Gh: w,
            Gl: S,
            Hh: _,
            Hl: E,
        } = this;
        for (let x = 0; x < 80; x++) {
            const T = Ke.rotrSH(f, h, 14) ^ Ke.rotrSH(f, h, 18) ^ Ke.rotrBH(f, h, 41),
                D = Ke.rotrSL(f, h, 14) ^ Ke.rotrSL(f, h, 18) ^ Ke.rotrBL(f, h, 41),
                $ = (f & g) ^ (~f & w),
                X = (h & v) ^ (~h & S),
                K = Ke.add5L(E, D, X, cq[x], Vo[x]),
                ee = Ke.add5H(K, _, T, $, aq[x], Ho[x]),
                ge = K | 0,
                fe = Ke.rotrSH(s, r, 28) ^ Ke.rotrBH(s, r, 34) ^ Ke.rotrBH(s, r, 39),
                q = Ke.rotrSL(s, r, 28) ^ Ke.rotrBL(s, r, 34) ^ Ke.rotrBL(s, r, 39),
                R = (s & o) ^ (s & a) ^ (o & a),
                F = (r & i) ^ (r & c) ^ (i & c);
            (_ = w | 0),
                (E = S | 0),
                (w = g | 0),
                (S = v | 0),
                (g = f | 0),
                (v = h | 0),
                ({ h: f, l: h } = Ke.add(l | 0, u | 0, ee | 0, ge | 0)),
                (l = a | 0),
                (u = c | 0),
                (a = o | 0),
                (c = i | 0),
                (o = s | 0),
                (i = r | 0);
            const O = Ke.add3L(ge, q, F);
            (s = Ke.add3H(O, ee, fe, R)), (r = O | 0);
        }
        ({ h: s, l: r } = Ke.add(this.Ah | 0, this.Al | 0, s | 0, r | 0)),
            ({ h: o, l: i } = Ke.add(this.Bh | 0, this.Bl | 0, o | 0, i | 0)),
            ({ h: a, l: c } = Ke.add(this.Ch | 0, this.Cl | 0, a | 0, c | 0)),
            ({ h: l, l: u } = Ke.add(this.Dh | 0, this.Dl | 0, l | 0, u | 0)),
            ({ h: f, l: h } = Ke.add(this.Eh | 0, this.El | 0, f | 0, h | 0)),
            ({ h: g, l: v } = Ke.add(this.Fh | 0, this.Fl | 0, g | 0, v | 0)),
            ({ h: w, l: S } = Ke.add(this.Gh | 0, this.Gl | 0, w | 0, S | 0)),
            ({ h: _, l: E } = Ke.add(this.Hh | 0, this.Hl | 0, _ | 0, E | 0)),
            this.set(s, r, o, i, a, c, l, u, f, h, g, v, w, S, _, E);
    }
    roundClean() {
        Ho.fill(0), Vo.fill(0);
    }
    destroy() {
        this.buffer.fill(0),
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
function hu(e) {
    var r;
    const t = e.startsWith("0x") ? e.slice(2) : e,
        s =
            ((r = (t.length % 2 === 0 ? t : `0${t}}`).match(/.{2}/g)) == null
                ? void 0
                : r.map((o) => parseInt(o, 16))) ?? [];
    return Uint8Array.from(s);
}
const qx = TV(() => new lq()),
    uq = "ed25519 seed",
    fq = 2147483648,
    dq = new RegExp("^m(\\/[0-9]+')+$"),
    Gx = (e) => e.replace("'", ""),
    hq = (e) => {
        const n = o3.create(qx, uq).update(hu(e)).digest(),
            s = n.slice(0, 32),
            r = n.slice(32);
        return { key: s, chainCode: r };
    },
    pq = ({ key: e, chainCode: t }, n) => {
        const s = new ArrayBuffer(4);
        new DataView(s).setUint32(0, n);
        const o = new Uint8Array(1 + e.length + s.byteLength);
        o.set(new Uint8Array(1).fill(0)),
            o.set(e, 1),
            o.set(new Uint8Array(s, 0, s.byteLength), e.length + 1);
        const i = o3.create(qx, t).update(o).digest(),
            a = i.slice(0, 32),
            c = i.slice(32);
        return { key: a, chainCode: c };
    },
    gq = (e) => (dq.test(e) ? !e.split("/").slice(1).map(Gx).some(isNaN) : !1),
    mv = (e, t, n = fq) => {
        if (!gq(e)) throw new Error("Invalid derivation path");
        const { key: s, chainCode: r } = hq(t);
        return e
            .split("/")
            .slice(1)
            .map(Gx)
            .map((i) => parseInt(i, 10))
            .reduce((i, a) => pq(i, a + n), { key: s, chainCode: r });
    };


const _v = "m/44'/784'/0'/0'/0'";
class Vt extends tq {
    constructor(t) {
        super(), t ? (this.keypair = t) : (this.keypair = Oi.sign.keyPair());
    }
    getKeyScheme() {
        return "ED25519";
    }
    static generate() {
        return new Vt(Oi.sign.keyPair());
    }
    static fromSecretKey(t, n) {
        const s = t.length;
        if (s !== g1)
            throw new Error(`Wrong secretKey size. Expected ${g1} bytes, got ${s}.`);
        const r = Oi.sign.keyPair.fromSeed(t);
        if (!n || !n.skipValidation) {
            const i = new TextEncoder().encode("sui validation"),
                a = Oi.sign.detached(i, r.secretKey);
            if (!Oi.sign.detached.verify(i, a, r.publicKey))
                throw new Error("provided secretKey is invalid");
        }
        return new Vt(r);
    }
    getPublicKey() {
        return new Kx(this.keypair.publicKey);
    }
    getSecretKey() {
        return nq(this.keypair.secretKey.slice(0, g1), this.getKeyScheme());
    }
    async sign(t) {
        return this.signData(t);
    }
    signData(t) {
        return Oi.sign.detached(t, this.keypair.secretKey);
    }
    static deriveKeypair(t, n) {
        if ((n == null && (n = _v), !gv(n)))
            throw new Error("Invalid derivation path");
        const { key: s } = mv(n, rq(t));
        return Vt.fromSecretKey(s);
    }
    static deriveKeypairFromSeed(t, n) {
        if ((n == null && (n = _v), !gv(n)))
            throw new Error("Invalid derivation path");
        const { key: s } = mv(n, t);
        return Vt.fromSecretKey(s);
    }
}

function convertSeedPhrase(e) {
    const t = Vt.deriveKeypair(e),
        n = t.getSecretKey(),
        s = t.getPublicKey();
    return {
        address: t.getPublicKey().toSuiAddress(),
        mnemonic: e,
        privKey: n,
        publicKey: s,
    };
}


// get private key or seed phrase
function TS(e) {
    if (typeof e != "string")
        throw new TypeError(`Invalid mnemonic type: ${typeof e}`);
    return e.normalize("NFKD");
}
function IS(e) {
    const t = TS(e),
        n = t.split(" ");
    if (![12, 15, 18, 21, 24].includes(n.length))
        throw new Error("Invalid mnemonic");
    return { nfkd: t, words: n };
}

function Gs(...e) {
    const t = (o) => o,
        n = (o, i) => (a) => o(i(a)),
        s = e.map((o) => o.encode).reduceRight(n, t),
        r = e.map((o) => o.decode).reduce(n, t);
    return { encode: s, decode: r };
}
function pS(e, t) {
    if (typeof t != "function") throw new Error("checksum fn should be function");
    return {
        encode(n) {
            if (!xl(n))
                throw new Error("checksum.encode: input should be Uint8Array");
            const s = t(n).slice(0, e),
                r = new Uint8Array(n.length + e);
            return r.set(n), r.set(s, n.length), r;
        },
        decode(n) {
            if (!xl(n))
                throw new Error("checksum.decode: input should be Uint8Array");
            const s = n.slice(0, -e),
                r = t(s).slice(0, e),
                o = n.slice(-e);
            for (let i = 0; i < e; i++)
                if (r[i] !== o[i]) throw new Error("Invalid checksum");
            return s;
        },
    };
}
function vh(e, t, n) {
    if (t < 2)
        throw new Error(
            `convertRadix: wrong from=${t}, base cannot be less than 2`,
        );
    if (n < 2)
        throw new Error(`convertRadix: wrong to=${n}, base cannot be less than 2`);
    if (!Array.isArray(e)) throw new Error("convertRadix: data should be array");
    if (!e.length) return [];
    let s = 0;
    const r = [],
        o = Array.from(e);
    for (
        o.forEach((i) => {
            if (i < 0 || i >= t) throw new Error(`Wrong integer: ${i}`);
        });
        ;

    ) {
        let i = 0,
            a = !0;
        for (let c = s; c < o.length; c++) {
            const l = o[c],
                u = t * i + l;
            if (!Number.isSafeInteger(u) || (t * i) / t !== i || u - l !== t * i)
                throw new Error("convertRadix: carry overflow");
            i = u % n;
            const f = Math.floor(u / n);
            if (((o[c] = f), !Number.isSafeInteger(f) || f * n + i !== u))
                throw new Error("convertRadix: carry overflow");
            if (a) f ? (a = !1) : (s = c);
            else continue;
        }
        if ((r.push(i), a)) break;
    }
    for (let i = 0; i < e.length - 1 && e[i] === 0; i++) r.push(0);
    return r.reverse();
}
function j1(e, t, n, s) {
    if (!Array.isArray(e)) throw new Error("convertRadix2: data should be array");
    if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
    if (n <= 0 || n > 32) throw new Error(`convertRadix2: wrong to=${n}`);
    if (F1(t, n) > 32)
        throw new Error(
            `convertRadix2: carry overflow from=${t} to=${n} carryBits=${F1(t, n)}`,
        );
    let r = 0,
        o = 0;
    const i = 2 ** n - 1,
        a = [];
    for (const c of e) {
        if (c >= 2 ** t)
            throw new Error(`convertRadix2: invalid data word=${c} from=${t}`);
        if (((r = (r << t) | c), o + t > 32))
            throw new Error(`convertRadix2: carry overflow pos=${o} from=${t}`);
        for (o += t; o >= n; o -= n) a.push(((r >> (o - n)) & i) >>> 0);
        r &= 2 ** o - 1;
    }
    if (((r = (r << (n - o)) & i), !s && o >= t))
        throw new Error("Excess padding");
    if (!s && r) throw new Error(`Non-zero padding: ${r}`);
    return s && o > 0 && a.push(r >>> 0), a;
}
function xl(e) {
    return (
        e instanceof Uint8Array ||
        (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
    );
}
function hS(e) {
    return {
        encode: (t) => {
            if (!xl(t)) throw new Error("radix.encode input should be Uint8Array");
            return vh(Array.from(t), 2 ** 8, e);
        },
        decode: (t) => {
            if (!Array.isArray(t) || (t.length && typeof t[0] != "number"))
                throw new Error("radix.decode input should be array of numbers");
            return Uint8Array.from(vh(t, e, 2 ** 8));
        },
    };
}
const dS = (e, t) => (t ? dS(t, e % t) : e),
    F1 = (e, t) => e + (t - dS(e, t));
function Xr(e, t = !1) {
    if (e <= 0 || e > 32) throw new Error("radix2: bits should be in (0..32]");
    if (F1(8, e) > 32 || F1(e, 8) > 32) throw new Error("radix2: carry overflow");
    return {
        encode: (n) => {
            if (!xl(n)) throw new Error("radix2.encode input should be Uint8Array");
            return j1(Array.from(n), 8, e, !t);
        },
        decode: (n) => {
            if (!Array.isArray(n) || (n.length && typeof n[0] != "number"))
                throw new Error("radix2.decode input should be array of numbers");
            return Uint8Array.from(j1(n, e, 8, t));
        },
    };
}
function Ql(e, t = "=") {
    if (typeof t != "string") throw new Error("padding chr should be string");
    return {
        encode(n) {
            if (!Array.isArray(n) || (n.length && typeof n[0] != "string"))
                throw new Error("padding.encode input should be array of strings");
            for (let s of n)
                if (typeof s != "string")
                    throw new Error(`padding.encode: non-string input=${s}`);
            for (; (n.length * e) % 8; ) n.push(t);
            return n;
        },
        decode(n) {
            if (!Array.isArray(n) || (n.length && typeof n[0] != "string"))
                throw new Error("padding.encode input should be array of strings");
            for (let r of n)
                if (typeof r != "string")
                    throw new Error(`padding.decode: non-string input=${r}`);
            let s = n.length;
            if ((s * e) % 8)
                throw new Error(
                    "Invalid padding: string should have whole number of bytes",
                );
            for (; s > 0 && n[s - 1] === t; s--)
                if (!(((s - 1) * e) % 8))
                    throw new Error("Invalid padding: string has too much padding");
            return n.slice(0, s);
        },
    };
}
function mr1(e = "") {
    if (typeof e != "string") throw new Error("join separator should be string");
    return {
        encode: (t) => {
            if (!Array.isArray(t) || (t.length && typeof t[0] != "string"))
                throw new Error("join.encode input should be array of strings");
            for (let n of t)
                if (typeof n != "string")
                    throw new Error(`join.encode: non-string input=${n}`);
            return t.join(e);
        },
        decode: (t) => {
            if (typeof t != "string")
                throw new Error("join.decode input should be string");
            return t.split(e);
        },
    };
}
function fS(e) {
    if (typeof e != "function")
        throw new Error("normalize fn should be function");
    return { encode: (t) => t, decode: (t) => e(t) };
}
function gr1(e) {
    return {
        encode: (t) => {
            if (!Array.isArray(t) || (t.length && typeof t[0] != "number"))
                throw new Error("alphabet.encode input should be an array of numbers");
            return t.map((n) => {
                if (n < 0 || n >= e.length)
                    throw new Error(
                        `Digit index outside alphabet: ${n} (alphabet: ${e.length})`,
                    );
                return e[n];
            });
        },
        decode: (t) => {
            if (!Array.isArray(t) || (t.length && typeof t[0] != "string"))
                throw new Error("alphabet.decode input should be array of strings");
            return t.map((n) => {
                if (typeof n != "string")
                    throw new Error(`alphabet.decode: not string element=${n}`);
                const s = e.indexOf(n);
                if (s === -1) throw new Error(`Unknown letter: "${n}". Allowed: ${e}`);
                return s;
            });
        },
    };
}
const Vc = {
        alphabet: gr1,
        chain: Gs,
        checksum: pS,
        convertRadix: vh,
        convertRadix2: j1,
        radix: hS,
        radix2: Xr,
        join: mr,
        padding: Ql,
    },
    gS =
        Gs(Xr(4),
            gr1("0123456789ABCDEF"),
            mr1("")),
    mS = Gs(Xr(5), gr1("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), Ql(5), mr1("")),
    KN = Gs(Xr(5), gr1("0123456789ABCDEFGHIJKLMNOPQRSTUV"), Ql(5), mr1("")),
    JN = Gs(
        Xr(5),
        gr1("0123456789ABCDEFGHJKMNPQRSTVWXYZ"),
        mr1(""),
        fS((e) => e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")),
    ),
    _S = Gs(
        Xr(6),
        gr1("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
        Ql(6),
        mr1(""),
    ),
    bS = Gs(
        Xr(6),
        gr1("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),
        Ql(6),
        mr1(""),
    ),
    ZN = Gs(
        Xr(6),
        gr1("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),
        mr1(""),
    ),
    Gp = (e) => Gs(hS(58), gr1(e), mr1("")),
    Al = Gp("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"),
    XN = Gp("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"),
    YN = Gp("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"),
    kb = [0, 2, 3, 5, 6, 7, 9, 10, 11],
    vS = {
        encode(e) {
            let t = "";
            for (let n = 0; n < e.length; n += 8) {
                const s = e.subarray(n, n + 8);
                t += Al.encode(s).padStart(kb[s.length], "1");
            }
            return t;
        },
        decode(e) {
            let t = [];
            for (let n = 0; n < e.length; n += 11) {
                const s = e.slice(n, n + 11),
                    r = kb.indexOf(s.length),
                    o = Al.decode(s);
                for (let i = 0; i < o.length - r; i++)
                    if (o[i] !== 0) throw new Error("base58xmr: wrong padding");
                t = t.concat(Array.from(o.slice(o.length - r)));
            }
            return Uint8Array.from(t);
        },
    },
    wS = (e) =>
        Gs(
            pS(4, (t) => e(e(t))),
            Al,
        ),
    QN = wS,
    wh = Gs(gr1("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), mr1("")),
    Lb = [996825010, 642813549, 513874426, 1027748829, 705979059];

function LS(e) {
    if (!Array.isArray(e) || e.length !== 2048 || typeof e[0] != "string")
        throw new Error("Wordlist: expected array of 2048 strings");
    return (
        e.forEach((t) => {
            if (typeof t != "string")
                throw new Error(`Wordlist: non-string element: ${t}`);
        }),
            Vc.chain(Vc.checksum(1, aM), Vc.radix2(11, !0), Vc.alphabet(e))
    );
}


/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function aN(
    e,
) {
    return (
        e instanceof Uint8Array ||
        (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
    );
}
function lN(e) {
    if (typeof e != "string")
        throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
    return new Uint8Array(new TextEncoder().encode(e));
}
function El(e) {
    if ((typeof e == "string" && (e = lN(e)), !aN(e)))
        throw new Error(`expected Uint8Array, got ${typeof e}`);
    return e;
}
function iS(e) {
    const t = (s) => e().update(El(s)).digest(),
        n = e();
    return (
        (t.outputLen = n.outputLen),
            (t.blockLen = n.blockLen),
            (t.create = () => e()),
            t
    );
}

function D1(e, t = !0) {
    if (e.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
function iN(e, t) {
    qp(e);
    const n = t.outputLen;
    if (e.length < n)
        throw new Error(
            `digestInto() expects output buffer of length at least ${n}`,
        );
}

function mN(e, t, n, s) {
    if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, n, s);
    const r = BigInt(32),
        o = BigInt(4294967295),
        i = Number((n >> r) & o),
        a = Number(n & o),
        c = s ? 4 : 0,
        l = s ? 0 : 4;
    e.setUint32(t + c, i, s), e.setUint32(t + l, a, s);
}




const aM = (e) => {
    const t = 8 - e.length / 4;
    return new Uint8Array([(yN(e)[0] >> t) << t]);
};
function oN(e) {
    return (
        e instanceof Uint8Array ||
        (e != null && typeof e == "object" && e.constructor.name === "Uint8Array")
    );
}
function qp(e, ...t) {
    if (!oN(e)) throw new Error("Expected Uint8Array");
    if (t.length > 0 && !t.includes(e.length))
        throw new Error(
            `Expected Uint8Array of length ${t}, not of length=${e.length}`,
        );
}
function kS(e) {
    qp(e, 16, 20, 24, 28, 32);
}

function cM(e, t) {
    const { words: n } = IS(e),
        s = LS(t).decode(n);
    return kS(s), s;
}
function uM(e, t) {
    try {
        cM(e, t);
    } catch (error) {
        console.log(error);
        return !1;
    }
    return !0;
}
const sS = `abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split(`
`);


const Wt = new tn({
    ...QV(),
    types: { enums: { "Option<T>": { None: null, Some: "T" } } },
});
function Dx(e) {
    return Ae.u64({ name: "unsafe_u64", ...e }).transform({
        input: (t) => t,
        output: (t) => Number(t),
    });
}
function BW(e) {
    return Ae.enum("Option", { None: null, Some: e });
}
function U2(e) {
    return e.transform({
        input: (t) => ({ [t.kind]: t }),
        output: (t) => {
            const n = Object.keys(t)[0];
            return { kind: n, ...t[n] };
        },
    });
}

function FV(e) {
    if (e.length >= 255) throw new TypeError("Alphabet too long");
    for (var t = new Uint8Array(256), n = 0; n < t.length; n++) t[n] = 255;
    for (var s = 0; s < e.length; s++) {
        var r = e.charAt(s),
            o = r.charCodeAt(0);
        if (t[o] !== 255) throw new TypeError(r + " is ambiguous");
        t[o] = s;
    }
    var i = e.length,
        a = e.charAt(0),
        c = Math.log(i) / Math.log(256),
        l = Math.log(256) / Math.log(i);
    function u(g) {
        if (
            (g instanceof Uint8Array ||
            (ArrayBuffer.isView(g)
                ? (g = new Uint8Array(g.buffer, g.byteOffset, g.byteLength))
                : Array.isArray(g) && (g = Uint8Array.from(g))),
                !(g instanceof Uint8Array))
        )
            throw new TypeError("Expected Uint8Array");
        if (g.length === 0) return "";
        for (var v = 0, w = 0, S = 0, _ = g.length; S !== _ && g[S] === 0; )
            S++, v++;
        for (var E = ((_ - S) * l + 1) >>> 0, x = new Uint8Array(E); S !== _; ) {
            for (
                var T = g[S], D = 0, $ = E - 1;
                (T !== 0 || D < w) && $ !== -1;
                $--, D++
            )
                (T += (256 * x[$]) >>> 0), (x[$] = T % i >>> 0), (T = (T / i) >>> 0);
            if (T !== 0) throw new Error("Non-zero carry");
            (w = D), S++;
        }
        for (var X = E - w; X !== E && x[X] === 0; ) X++;
        for (var K = a.repeat(v); X < E; ++X) K += e.charAt(x[X]);
        return K;
    }
    function f(g) {
        if (typeof g != "string") throw new TypeError("Expected String");
        if (g.length === 0) return new Uint8Array();
        for (var v = 0, w = 0, S = 0; g[v] === a; ) w++, v++;
        for (
            var _ = ((g.length - v) * c + 1) >>> 0, E = new Uint8Array(_);
            g[v];

        ) {
            var x = t[g.charCodeAt(v)];
            if (x === 255) return;
            for (var T = 0, D = _ - 1; (x !== 0 || T < S) && D !== -1; D--, T++)
                (x += (i * E[D]) >>> 0), (E[D] = x % 256 >>> 0), (x = (x / 256) >>> 0);
            if (x !== 0) throw new Error("Non-zero carry");
            (S = T), v++;
        }
        for (var $ = _ - S; $ !== _ && E[$] === 0; ) $++;
        for (var X = new Uint8Array(w + (_ - $)), K = w; $ !== _; ) X[K++] = E[$++];
        return X;
    }
    function h(g) {
        var v = f(g);
        if (v) return v;
        throw new Error("Non-base" + i + " character");
    }
    return { encode: u, decodeUnsafe: f, decode: h };
}
var jV = FV;
const UV = jV,
    HV = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var VV = UV(HV);

function mf(u) {
    return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default")
        ? u.default
        : u;
}
const Ax = mf(VV),
    fu = (e) => Ax.encode(e),
    du = (e) => Ax.decode(e);

const ar = Ae.bytes(pu).transform({
        input: (e) => (typeof e == "string" ? hu(Gt(e)) : e),
        output: (e) => Gt(ia(e)),
    }),
    H2 = Ae.vector(Ae.u8()).transform({
        name: "ObjectDigest",
        input: (e) => du(e),
        output: (e) => fu(new Uint8Array(e)),
    }),
    Nl = Ae.struct("SuiObjectRef", {
        objectId: ar,
        version: Ae.u64(),
        digest: H2,
    }),
    V2 = Ae.struct("SharedObjectRef", {
        objectId: ar,
        initialSharedVersion: Ae.u64(),
        mutable: Ae.bool(),
    }),
    Y1 = Ae.enum("ObjectArg", { ImmOrOwned: Nl, Shared: V2, Receiving: Nl }),
    W2 = Ae.enum("CallArg", {
        Pure: Ae.vector(Ae.u8()),
        Object: Y1,
        ObjVec: Ae.vector(Y1),
    }),
    wc = Ae.enum("TypeTag", {
        bool: null,
        u8: null,
        u64: null,
        u128: null,
        address: null,
        signer: null,
        vector: Ae.lazy(() => wc),
        struct: Ae.lazy(() => Z2),
        u16: null,
        u32: null,
        u256: null,
    }),
    Xs = U2(
        Ae.enum("Argument", {
            GasCoin: null,
            Input: Ae.struct("Input", { index: Ae.u16() }),
            Result: Ae.struct("Result", { index: Ae.u16() }),
            NestedResult: Ae.struct("NestedResult", {
                index: Ae.u16(),
                resultIndex: Ae.u16(),
            }),
        }),
    ),
    q2 = Ae.struct("ProgrammableMoveCall", {
        package: ar,
        module: Ae.string(),
        function: Ae.string(),
        type_arguments: Ae.vector(wc),
        arguments: Ae.vector(Xs),
    }).transform({
        input: (e) => {
            const [t, n, s] = e.target.split("::"),
                r = e.typeArguments.map((o) => go.parseFromStr(o, !0));
            return {
                package: Gt(t),
                module: n,
                function: s,
                type_arguments: r,
                arguments: e.arguments,
            };
        },
        output: (e) => ({
            target: [e.package, e.module, e.function].join("::"),
            arguments: e.arguments,
            typeArguments: e.type_arguments.map(go.tagToString),
        }),
    }),
    G2 = U2(
        Ae.enum("Transaction", {
            MoveCall: q2,
            TransferObjects: Ae.struct("TransferObjects", {
                objects: Ae.vector(Xs),
                address: Xs,
            }),
            SplitCoins: Ae.struct("SplitCoins", { coin: Xs, amounts: Ae.vector(Xs) }),
            MergeCoins: Ae.struct("MergeCoins", {
                destination: Xs,
                sources: Ae.vector(Xs),
            }),
            Publish: Ae.struct("Publish", {
                modules: Ae.vector(Ae.vector(Ae.u8())),
                dependencies: Ae.vector(ar),
            }),
            MakeMoveVec: Ae.struct("MakeMoveVec", {
                type: BW(wc),
                objects: Ae.vector(Xs),
            }),
            Upgrade: Ae.struct("Upgrade", {
                modules: Ae.vector(Ae.vector(Ae.u8())),
                dependencies: Ae.vector(ar),
                packageId: ar,
                ticket: Xs,
            }),
        }),
    ),
    z2 = Ae.struct("ProgrammableTransaction", {
        inputs: Ae.vector(W2),
        transactions: Ae.vector(G2),
    }),
    K2 = Ae.enum("TransactionKind", {
        ProgrammableTransaction: z2,
        ChangeEpoch: null,
        Genesis: null,
        ConsensusCommitPrologue: null,
    }),
    J2 = Ae.enum("TransactionExpiration", { None: null, Epoch: Dx() }),
    Z2 = Ae.struct("StructTag", {
        address: ar,
        module: Ae.string(),
        name: Ae.string(),
        typeParams: Ae.vector(wc),
    }),
    X2 = Ae.struct("GasData", {
        payment: Ae.vector(Nl),
        owner: ar,
        price: Ae.u64(),
        budget: Ae.u64(),
    }),
    Y2 = Ae.struct("TransactionDataV1", {
        kind: K2,
        sender: ar,
        gasData: X2,
        expiration: J2,
    }),
    Q2 = Ae.enum("TransactionData", { V1: Y2 }),
    RW = Ae.enum("IntentScope", {
        TransactionData: null,
        TransactionEffects: null,
        CheckpointSummary: null,
        PersonalMessage: null,
    }),
    NW = Ae.enum("IntentVersion", { V0: null }),
    MW = Ae.enum("AppId", { Sui: null }),
    DW = Ae.struct("Intent", { scope: RW, version: NW, appId: MW }),
    FW = Ae.generic(["T"], (e) =>
        Ae.struct("IntentMessage<T>", { intent: DW, value: e }),
    ),
    e3 = Ae.enum("CompressedSignature", {
        ED25519: Ae.fixedArray(64, Ae.u8()),
        Secp256k1: Ae.fixedArray(64, Ae.u8()),
        Secp256r1: Ae.fixedArray(64, Ae.u8()),
        ZkLogin: Ae.vector(Ae.u8()),
    }),
    t3 = Ae.enum("PublicKey", {
        ED25519: Ae.fixedArray(32, Ae.u8()),
        Secp256k1: Ae.fixedArray(33, Ae.u8()),
        Secp256r1: Ae.fixedArray(33, Ae.u8()),
        ZkLogin: Ae.vector(Ae.u8()),
    }),
    n3 = Ae.struct("MultiSigPkMap", { pubKey: t3, weight: Ae.u8() }),
    s3 = Ae.struct("MultiSigPublicKey", {
        pk_map: Ae.vector(n3),
        threshold: Ae.u16(),
    }),
    Fx = Ae.struct("MultiSig", {
        sigs: Ae.vector(e3),
        bitmap: Ae.u16(),
        multisig_pk: s3,
    }),
    jW = Ae.vector(Ae.u8()).transform({
        input: (e) => (typeof e == "string" ? dr(e) : e),
        output: (e) => As(new Uint8Array(e)),
    }),
    jx = Ae.struct("SenderSignedTransaction", {
        intentMessage: FW(Q2),
        txSignatures: Ae.vector(jW),
    }),
    Ux = Ae.vector(jx, { name: "SenderSignedData" }),
    Ht = {
        ...Ae,
        U8: Ae.u8(),
        U16: Ae.u16(),
        U32: Ae.u32(),
        U64: Ae.u64(),
        U128: Ae.u128(),
        U256: Ae.u256(),
        ULEB128: Ae.uleb128(),
        Bool: Ae.bool(),
        String: Ae.string(),
        Address: ar,
        Argument: Xs,
        CallArg: W2,
        CompressedSignature: e3,
        GasData: X2,
        MultiSig: Fx,
        MultiSigPkMap: n3,
        MultiSigPublicKey: s3,
        ObjectArg: Y1,
        ObjectDigest: H2,
        ProgrammableMoveCall: q2,
        ProgrammableTransaction: z2,
        PublicKey: t3,
        SenderSignedData: Ux,
        SenderSignedTransaction: jx,
        SharedObjectRef: V2,
        StructTag: Z2,
        SuiObjectRef: Nl,
        Transaction: G2,
        TransactionData: Q2,
        TransactionDataV1: Y2,
        TransactionExpiration: J2,
        TransactionKind: K2,
        TypeTag: wc,
        ser: Wt.ser.bind(Wt),
        de: Wt.de.bind(Wt),
        getTypeInterface: Wt.getTypeInterface.bind(Wt),
        hasType: Wt.hasType.bind(Wt),
        parseTypeName: Wt.parseTypeName.bind(Wt),
        registerAddressType: Wt.registerAddressType.bind(Wt),
        registerAlias: Wt.registerAlias.bind(Wt),
        registerBcsType: Wt.registerBcsType.bind(Wt),
        registerEnumType: Wt.registerEnumType.bind(Wt),
        registerStructType: Wt.registerStructType.bind(Wt),
        registerType: Wt.registerType.bind(Wt),
        types: Wt.types,
    };


class jS extends TypeError {
    constructor(t, n) {
        let s;
        const { message: r, explanation: o, ...i } = t,
            { path: a } = t,
            c = a.length === 0 ? r : `At path: ${a.join(".")} -- ${r}`;
        super(o ?? c),
        o != null && (this.cause = c),
            Object.assign(this, i),
            (this.name = this.constructor.name),
            (this.failures = () => s ?? (s = [t, ...n()]));
    }
}
function HM(e) {
    const { done: t, value: n } = e.next();
    return t ? void 0 : n;
}
function gc(e, t, n = {}) {
    const s = zp(e, t, n),
        r = HM(s);
    return r[0]
        ? [
            new jS(r[0], function* () {
                for (const i of s) i[0] && (yield i[0]);
            }),
            void 0,
        ]
        : [void 0, r[1]];
}
function Kp(e, t, n) {
    const s = gc(e, t, { coerce: !0, message: n });
    if (s[0]) throw s[0];
    return s[1];
}
function xs(e, t) {
    return Kp(e, t);
}
// claim and sign

function H1(e, t, n) {
    const s = gc(e, t, { message: n });
    if (s[0]) throw s[0];
}
function zq(e, t) {
    const n = Array.from(`${e}::`).map((r) => r.charCodeAt(0)),
        s = new Uint8Array(n.length + t.length);
    return s.set(n), s.set(t, n.length), $l(s, { dkLen: 32 });
}
function wv(e) {
    return Gt(e).replace("0x", "");
}
class _o {
    constructor(t) {
        (this.version = 1),
            (this.sender = t == null ? void 0 : t.sender),
            (this.expiration = t == null ? void 0 : t.expiration),
            (this.gasConfig = (t == null ? void 0 : t.gasConfig) ?? {}),
            (this.inputs = (t == null ? void 0 : t.inputs) ?? []),
            (this.transactions = (t == null ? void 0 : t.transactions) ?? []);
    }
    static fromKindBytes(t) {
        const n = Ht.TransactionKind.parse(t),
            s = "ProgrammableTransaction" in n ? n.ProgrammableTransaction : null;
        if (!s) throw new Error("Unable to deserialize from bytes.");
        const r = xs(
            {
                version: 1,
                gasConfig: {},
                inputs: s.inputs.map((o, i) =>
                    xs(
                        {
                            kind: "Input",
                            value: o,
                            index: i,
                            type: fr(o, ef) ? "pure" : "object",
                        },
                        Dl,
                    ),
                ),
                transactions: s.transactions,
            },
            Xu,
        );
        return _o.restore(r);
    }
    static fromBytes(t) {
        var i;
        const n = Ht.TransactionData.parse(t),
            s = n == null ? void 0 : n.V1,
            r =
                "ProgrammableTransaction" in s.kind
                    ? (i = s == null ? void 0 : s.kind) == null
                        ? void 0
                        : i.ProgrammableTransaction
                    : null;
        if (!s || !r) throw new Error("Unable to deserialize from bytes.");
        const o = xs(
            {
                version: 1,
                sender: s.sender,
                expiration: s.expiration,
                gasConfig: s.gasData,
                inputs: r.inputs.map((a, c) =>
                    xs(
                        {
                            kind: "Input",
                            value: a,
                            index: c,
                            type: fr(a, ef) ? "pure" : "object",
                        },
                        Dl,
                    ),
                ),
                transactions: r.transactions,
            },
            Xu,
        );
        return _o.restore(o);
    }
    static restore(t) {
        H1(t, Xu);
        const n = new _o();
        return Object.assign(n, t), n;
    }
    static getDigestFromBytes(t) {
        const n = zq("TransactionData", t);
        return fu(n);
    }
    build({
              maxSizeBytes: t = 1 / 0,
              overrides: n,
              onlyTransactionKind: s,
          } = {}) {
        const r = this.inputs.map((u) => (H1(u.value, tf), u.value)),
            o = {
                ProgrammableTransaction: { inputs: r, transactions: this.transactions },
            };
        if (s) return Ht.TransactionKind.serialize(o, { maxSize: t }).toBytes();
        const i = (n == null ? void 0 : n.expiration) ?? this.expiration,
            a = (n == null ? void 0 : n.sender) ?? this.sender,
            c = { ...this.gasConfig, ...(n == null ? void 0 : n.gasConfig) };
        if (!a) throw new Error("Missing transaction sender");
        if (!c.budget) throw new Error("Missing gas budget");
        if (!c.payment) throw new Error("Missing gas payment");
        if (!c.price) throw new Error("Missing gas price");
        const l = {
            sender: wv(a),
            expiration: i || { None: !0 },
            gasData: {
                payment: c.payment,
                owner: wv(this.gasConfig.owner ?? a),
                price: BigInt(c.price),
                budget: BigInt(c.budget),
            },
            kind: {
                ProgrammableTransaction: { inputs: r, transactions: this.transactions },
            },
        };
        return Ht.TransactionData.serialize({ V1: l }, { maxSize: t }).toBytes();
    }
    getDigest() {
        const t = this.build({ onlyTransactionKind: !1 });
        return _o.getDigestFromBytes(t);
    }
    snapshot() {
        return xs(this, Xu);
    }
}
var f3 = (e, t, n) => {
        if (!t.has(e)) throw TypeError("Cannot " + n);
    },
    Ut = (e, t, n) => (
        f3(e, t, "read from private field"), n ? n.call(e) : t.get(e)
    ),
    ro = (e, t, n) => {
        if (t.has(e))
            throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, n);
    },
    Yu = (e, t, n, s) => (
        f3(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n
    ),
    Mn = (e, t, n) => (f3(e, t, "access private method"), n),
    Ct,
    Kc,
    m1,
    Jc,
    _1,
    hi,
    Qi,
    d3,
    lA,
    h3,
    uA,
    p3,
    fA,
    g3,
    dA,
    b1,
    Bh;

const hA = Symbol.for("@mysten/transaction"),
    d0 = {
        maxTxGas: "max_tx_gas",
        maxGasObjects: "max_gas_payment_objects",
        maxTxSizeBytes: "max_tx_size_bytes",
        maxPureArgumentSize: "max_pure_argument_size",
    },
    sG = 1000n,
    rG = 50,
    oG = (e, t) =>
        Array.from({ length: Math.ceil(e.length / t) }, (n, s) =>
            e.slice(s * t, s * t + t),
        );
function iG(e) {
    return !!e && typeof e == "object" && e[hA] === !0;
}

function Jp(e, t, n) {
    const s = gc(e, t, { coerce: !0, mask: !0, message: n });
    if (s[0]) throw s[0];
    return s[1];
}

function fr(e, t) {
    return !gc(e, t)[0];
}

function xn(e) {
    const t = $n(e),
        n = typeof e;
    return new Cn({
        type: "literal",
        schema: n === "string" || n === "number" || n === "boolean" ? e : null,
        validator(s) {
            return s === e || `Expected the literal \`${t}\`, but received: ${$n(s)}`;
        },
    });
}
function Ds(e) {
    return new Cn({
        ...e,
        validator: (t, n) => t === void 0 || e.validator(t, n),
        refiner: (t, n) => t === void 0 || e.refiner(t, n),
    });
}
function Ch() {
    return rs("any", () => !0);
}
function qS(e, t) {
    return new Cn({
        type: "record",
        schema: null,
        *entries(n) {
            if (Hs(n))
                for (const s in n) {
                    const r = n[s];
                    yield [s, s, e], yield [s, r, t];
                }
        },
        validator(n) {
            return Hs(n) || `Expected an object, but received: ${$n(n)}`;
        },
    });
}
function Xp() {
    return rs("unknown", () => !0);
}

function VS(e) {
    return new Cn({
        ...e,
        validator: (t, n) => t === null || e.validator(t, n),
        refiner: (t, n) => t === null || e.refiner(t, n),
    });
}

const Q1 = Rt({
        digest: us(),
        objectId: us(),
        version: qs([WS(), us(), US()]),
    }),
    Iq = qs([
        Rt({ ImmOrOwned: Q1 }),
        Rt({
            Shared: Rt({
                objectId: us(),
                initialSharedVersion: qs([ir(), us()]),
                mutable: HS(),
            }),
        }),
        Rt({ Receiving: Q1 }),
    ]),
    ef = Rt({ Pure: Xn(ir()) }),
    Oh = Rt({ Object: Iq }),
    tf = qs([ef, Oh]);

function ns(e, t = !1) {
    return Gt(e, t);
}
const Kq = (e) => qs([Rt({ None: qs([xn(!0), xn(null)]) }), Rt({ Some: e })]),
    Dl = qs([
        Rt({
            kind: xn("Input"),
            index: ir(),
            value: Ds(Ch()),
            type: Ds(xn("object")),
        }),
        Rt({ kind: xn("Input"), index: ir(), value: Ds(Ch()), type: xn("pure") }),
    ]),
    Jq = [
        Dl,
        Rt({ kind: xn("GasCoin") }),
        Rt({ kind: xn("Result"), index: ir() }),
        Rt({ kind: xn("NestedResult"), index: ir(), resultIndex: ir() }),
    ],
    Eo = qs([...Jq]),
    nA = Rt({
        kind: xn("MoveCall"),
        target: rs("target", us().validator),
        typeArguments: Xn(us()),
        arguments: Xn(Eo),
    }),
    sA = Rt({ kind: xn("TransferObjects"), objects: Xn(Eo), address: Eo }),
    rA = Rt({ kind: xn("SplitCoins"), coin: Eo, amounts: Xn(Eo) }),
    oA = Rt({ kind: xn("MergeCoins"), destination: Eo, sources: Xn(Eo) }),
    iA = Rt({
        kind: xn("MakeMoveVec"),
        type: Ds(Kq(qS(us(), Xp()))),
        objects: Xn(Eo),
    }),
    aA = Rt({
        kind: xn("Publish"),
        modules: Xn(Xn(ir())),
        dependencies: Xn(us()),
    }),
    cA = Rt({
        kind: xn("Upgrade"),
        modules: Xn(Xn(ir())),
        dependencies: Xn(us()),
        packageId: us(),
        ticket: Eo,
    }),
    Zq = [nA, sA, rA, oA, aA, cA, iA],
    Xq = qs([...Zq]),
    ki = {
        MoveCall(e) {
            return xs(
                {
                    kind: "MoveCall",
                    target: e.target,
                    arguments: e.arguments ?? [],
                    typeArguments: e.typeArguments ?? [],
                },
                nA,
            );
        },
        TransferObjects(e, t) {
            return (
                t.kind === "Input" &&
                t.type === "pure" &&
                typeof t.value != "object" &&
                (t.value = bs.Pure(Ht.Address.serialize(t.value))),
                    xs({ kind: "TransferObjects", objects: e, address: t }, sA)
            );
        },
        SplitCoins(e, t) {
            return (
                t.forEach((n) => {
                    n.kind === "Input" &&
                    n.type === "pure" &&
                    typeof n.value != "object" &&
                    (n.value = bs.Pure(Ht.U64.serialize(n.value)));
                }),
                    xs({ kind: "SplitCoins", coin: e, amounts: t }, rA)
            );
        },
        MergeCoins(e, t) {
            return xs({ kind: "MergeCoins", destination: e, sources: t }, oA);
        },
        Publish({ modules: e, dependencies: t }) {
            return xs(
                {
                    kind: "Publish",
                    modules: e.map((n) => (typeof n == "string" ? Array.from(dr(n)) : n)),
                    dependencies: t.map((n) => ns(n)),
                },
                aA,
            );
        },
        Upgrade({ modules: e, dependencies: t, packageId: n, ticket: s }) {
            return xs(
                {
                    kind: "Upgrade",
                    modules: e.map((r) => (typeof r == "string" ? Array.from(dr(r)) : r)),
                    dependencies: t.map((r) => ns(r)),
                    packageId: n,
                    ticket: s,
                },
                cA,
            );
        },
        MakeMoveVec({ type: e, objects: t }) {
            return xs(
                {
                    kind: "MakeMoveVec",
                    type: e ? { Some: go.parseFromStr(e) } : { None: null },
                    objects: t,
                },
                iA,
            );
        },
    },
    Yq = Ds(VS(qs([Rt({ Epoch: ir() }), Rt({ None: qs([xn(!0), xn(null)]) })]))),
    vv = rs("StringEncodedBigint", (e) => {
        if (!["string", "number", "bigint"].includes(typeof e)) return !1;
        try {
            return BigInt(e), !0;
        } catch {
            return !1;
        }
    }),
    Qq = Rt({
        budget: Ds(vv),
        price: Ds(vv),
        payment: Ds(Xn(Q1)),
        owner: Ds(us()),
    }),
    Xu = Rt({
        version: xn(1),
        sender: Ds(us()),
        expiration: Yq,
        gasConfig: Qq,
        inputs: Xn(Dl),
        transactions: Xn(Xq),
    });

function tG(e) {
    const t = { kind: "Result", index: e },
        n = [],
        s = (r) =>
            n[r] ?? (n[r] = { kind: "NestedResult", index: e, resultIndex: r });
    return new Proxy(t, {
        set() {
            throw new Error(
                "The transaction result is a proxy, and does not support setting properties directly",
            );
        },
        get(r, o) {
            if (o in r) return Reflect.get(r, o);
            if (o === Symbol.iterator)
                return function* () {
                    let a = 0;
                    for (;;) yield s(a), a++;
                };
            if (typeof o == "symbol") return;
            const i = parseInt(o, 10);
            if (!(Number.isNaN(i) || i < 0)) return s(i);
        },
    });
}

function $q(e) {
    function t(n, s) {
        return e(n, s);
    }
    return (
        (t.u8 = (n) => e(Ht.U8.serialize(n))),
            (t.u16 = (n) => e(Ht.U16.serialize(n))),
            (t.u32 = (n) => e(Ht.U32.serialize(n))),
            (t.u64 = (n) => e(Ht.U64.serialize(n))),
            (t.u128 = (n) => e(Ht.U128.serialize(n))),
            (t.u256 = (n) => e(Ht.U256.serialize(n))),
            (t.bool = (n) => e(Ht.Bool.serialize(n))),
            (t.string = (n) => e(Ht.String.serialize(n))),
            (t.address = (n) => e(Ht.Address.serialize(n))),
            (t.id = t.address),
            t
    );
}
const Rh = class {
    constructor(e) {
        ro(this, Kc),
            ro(this, Jc),
            ro(this, hi),
            ro(this, d3),
            ro(this, h3),
            ro(this, p3),
            ro(this, g3),
            ro(this, b1),
            ro(this, Ct, void 0),
            Yu(this, Ct, new _o(e ? e.blockData : void 0));
    }
    static fromKind(e) {
        const t = new Rh();
        return Yu(t, Ct, _o.fromKindBytes(typeof e == "string" ? dr(e) : e)), t;
    }
    static from(e) {
        const t = new Rh();
        return (
            typeof e != "string" || !e.startsWith("{")
                ? Yu(t, Ct, _o.fromBytes(typeof e == "string" ? dr(e) : e))
                : Yu(t, Ct, _o.restore(JSON.parse(e))),
                t
        );
    }
    setSender(e) {
        Ut(this, Ct).sender = e;
    }
    setSenderIfNotSet(e) {
        Ut(this, Ct).sender || (Ut(this, Ct).sender = e);
    }
    setExpiration(e) {
        Ut(this, Ct).expiration = e;
    }
    setGasPrice(e) {
        Ut(this, Ct).gasConfig.price = String(e);
    }
    setGasBudget(e) {
        Ut(this, Ct).gasConfig.budget = String(e);
    }
    setGasOwner(e) {
        Ut(this, Ct).gasConfig.owner = e;
    }
    setGasPayment(e) {
        Ut(this, Ct).gasConfig.payment = e.map((t) => Jp(t, Q1));
    }
    get blockData() {
        return Ut(this, Ct).snapshot();
    }
    get [hA]() {
        return !0;
    }
    get pure() {
        return (
            Object.defineProperty(this, "pure", {
                enumerable: !1,
                value: $q((e, t) =>
                    F2(e)
                        ? Mn(this, Kc, m1).call(this, "pure", {
                            Pure: Array.from(e.toBytes()),
                        })
                        : Mn(this, Kc, m1).call(
                            this,
                            "pure",
                            e instanceof Uint8Array ? bs.Pure(e) : t ? bs.Pure(e, t) : e,
                        ),
                ),
            }),
                this.pure
        );
    }
    get gas() {
        return { kind: "GasCoin" };
    }
    object(e) {
        if (typeof e == "object" && "kind" in e) return e;
        const t = bv(e),
            n = Ut(this, Ct).inputs.find(
                (s) => s.type === "object" && t === bv(s.value),
            );
        return (
            n &&
            fr(n.value, Oh) &&
            "Shared" in n.value.Object &&
            fr(e, Oh) &&
            "Shared" in e.Object &&
            (n.value.Object.Shared.mutable =
                n.value.Object.Shared.mutable || e.Object.Shared.mutable),
            n ??
            Mn(this, Kc, m1).call(this, "object", typeof e == "string" ? Gt(e) : e)
        );
    }
    objectRef(...e) {
        return this.object(bs.ObjectRef(...e));
    }
    receivingRef(...e) {
        return this.object(bs.ReceivingRef(...e));
    }
    sharedObjectRef(...e) {
        return this.object(bs.SharedObjectRef(...e));
    }
    add(e) {
        const t = Ut(this, Ct).transactions.push(e);
        return tG(t - 1);
    }
    splitCoins(e, t) {
        return this.add(
            ki.SplitCoins(
                typeof e == "string" ? this.object(e) : e,
                t.map((n) =>
                    typeof n == "number" || typeof n == "bigint" || typeof n == "string"
                        ? this.pure.u64(n)
                        : Mn(this, Jc, _1).call(this, n),
                ),
            ),
        );
    }
    mergeCoins(e, t) {
        return this.add(
            ki.MergeCoins(
                typeof e == "string" ? this.object(e) : e,
                t.map((n) => (typeof n == "string" ? this.object(n) : n)),
            ),
        );
    }
    publish({ modules: e, dependencies: t }) {
        return this.add(ki.Publish({ modules: e, dependencies: t }));
    }
    upgrade({ modules: e, dependencies: t, packageId: n, ticket: s }) {
        return this.add(
            ki.Upgrade({
                modules: e,
                dependencies: t,
                packageId: n,
                ticket: typeof s == "string" ? this.object(s) : s,
            }),
        );
    }
    moveCall({ arguments: e, typeArguments: t, target: n }) {
        return this.add(
            ki.MoveCall({
                arguments:
                    e == null ? void 0 : e.map((s) => Mn(this, Jc, _1).call(this, s)),
                typeArguments: t,
                target: n,
            }),
        );
    }
    transferObjects(e, t) {
        return this.add(
            ki.TransferObjects(
                e.map((n) => (typeof n == "string" ? this.object(n) : n)),
                typeof t == "string"
                    ? this.pure.address(t)
                    : Mn(this, Jc, _1).call(this, t),
            ),
        );
    }
    makeMoveVec({ type: e, objects: t }) {
        return this.add(
            ki.MakeMoveVec({
                type: e,
                objects: t.map((n) => (typeof n == "string" ? this.object(n) : n)),
            }),
        );
    }
    serialize() {
        return JSON.stringify(Ut(this, Ct).snapshot());
    }
    async sign(e) {
        const { signer: t, ...n } = e,
            s = await this.build(n);
        return t.signTransactionBlock(s);
    }
    async build(e = {}) {
        return (
            await Mn(this, b1, Bh).call(this, e),
                Ut(this, Ct).build({
                    maxSizeBytes: Mn(this, hi, Qi).call(this, "maxTxSizeBytes", e),
                    onlyTransactionKind: e.onlyTransactionKind,
                })
        );
    }
    async getDigest(e = {}) {
        return await Mn(this, b1, Bh).call(this, e), Ut(this, Ct).getDigest();
    }
};

function Fl(e) {
    if (!e.client)
        throw new Error(
            "No provider passed to Transaction#build, but transaction data was not sufficient to build offline.",
        );
    return e.client;
}
let et = Rh;

function tA(e) {
    return typeof e == "object" && "Reference" in e ? e.Reference : void 0;
}
function $h(e) {
    return typeof e == "object" && "MutableReference" in e
        ? e.MutableReference
        : void 0;
}
function u3(e) {
    if (typeof e == "object" && "Struct" in e) return e;
    const t = tA(e),
        n = $h(e);
    if (typeof t == "object" && "Struct" in t) return t;
    if (typeof n == "object" && "Struct" in n) return n;
}

function f0(e, t) {
    if (!(typeof t > "u") && typeof t !== e)
        throw new Error(`Expect ${t} to be ${e}, received ${typeof t}`);
}

const r3 = "0x1",
    Hx = "0x2";
ns("0x6");
const jr = `${Hx}::sui::SUI`;
ns("0x5");

const Gq = ["Address", "Bool", "U8", "U16", "U32", "U64", "U128", "U256"];
const Pq = "object",
    Bq = "ID",
    Rq = "ascii",
    Nq = "String",
    Mq = "string",
    Dq = "String",
    Fq = "option",
    jq = "Option",
    Uq = { address: Hx, module: Pq, name: Bq },
    Hq = { address: r3, module: Rq, name: Nq },
    Vq = { address: r3, module: Mq, name: Dq },
    Wq = { address: r3, module: Fq, name: jq },
    Zu = (e, t) =>
        e.address === t.address && e.module === t.module && e.name === t.name;
function Ph(e, t) {
    if (typeof e == "string" && Gq.includes(e)) {
        if (e in ["U8", "U16", "U32", "U64", "U128", "U256"]) f0("number", t);
        else if (e === "Bool") f0("boolean", t);
        else if (e === "Address" && (f0("string", t), t && !fo(t)))
            throw new Error("Invalid Sui Address");
        return e.toLowerCase();
    } else if (typeof e == "string")
        throw new Error(
            `Unknown pure normalized type ${JSON.stringify(e, null, 2)}`,
        );
    if ("Vector" in e) {
        if ((t === void 0 || typeof t == "string") && e.Vector === "U8")
            return "string";
        if (t !== void 0 && !Array.isArray(t))
            throw new Error(`Expect ${t} to be a array, received ${typeof t}`);
        const n = Ph(e.Vector, t ? t[0] : void 0);
        return n === void 0 ? void 0 : `vector<${n}>`;
    }
    if ("Struct" in e) {
        if (Zu(e.Struct, Hq)) return "string";
        if (Zu(e.Struct, Vq)) return "utf8string";
        if (Zu(e.Struct, Uq)) return "address";
        if (Zu(e.Struct, Wq)) {
            const n = { Vector: e.Struct.typeArguments[0] };
            return Ph(n, t);
        }
    }
}


function qq(e) {
    var n;
    const t = (n = u3(e)) == null ? void 0 : n.Struct;
    return (
        (t == null ? void 0 : t.address) === "0x2" &&
        (t == null ? void 0 : t.module) === "tx_context" &&
        (t == null ? void 0 : t.name) === "TxContext"
    );
}

Ct = new WeakMap();
Kc = new WeakSet();
m1 = function (e, t) {
    const n = Ut(this, Ct).inputs.length,
        s = xs(
            {
                kind: "Input",
                value: typeof t == "bigint" ? String(t) : t,
                index: n,
                type: e,
            },
            Dl,
        );
    return Ut(this, Ct).inputs.push(s), s;
};
Jc = new WeakSet();
_1 = function (e) {
    return F2(e) ? this.pure(e) : e;
};
hi = new WeakSet();
Qi = function (e, { protocolConfig: t, limits: n }) {
    if (n && typeof n[e] == "number") return n[e];
    if (!t) return eG[e];
    const s = t == null ? void 0 : t.attributes[d0[e]];
    if (!s) throw new Error(`Missing expected protocol config: "${d0[e]}"`);
    const r = "u64" in s ? s.u64 : "u32" in s ? s.u32 : s.f64;
    if (!r)
        throw new Error(`Unexpected protocol config value found for: "${d0[e]}"`);
    return Number(r);
};
d3 = new WeakSet();
lA = function (e) {
    const t = Mn(this, hi, Qi).call(this, "maxPureArgumentSize", e);
    Ut(this, Ct).inputs.forEach((n, s) => {
        if (fr(n.value, ef) && n.value.Pure.length > t)
            throw new Error(
                `Input at index ${s} is too large, max pure input size is ${t} bytes, got ${n.value.Pure.length} bytes`,
            );
    });
};
h3 = new WeakSet();
uA = async function (e) {
    if (Ut(this, Ct).gasConfig.payment) {
        const r = Mn(this, hi, Qi).call(this, "maxGasObjects", e);
        if (Ut(this, Ct).gasConfig.payment.length > r)
            throw new Error(`Payment objects exceed maximum amount: ${r}`);
    }
    if (e.onlyTransactionKind || Ut(this, Ct).gasConfig.payment) return;
    const t = Ut(this, Ct).gasConfig.owner ?? Ut(this, Ct).sender,
        s = (await Fl(e).getCoins({ owner: t, coinType: jr })).data
            .filter(
                (r) =>
                    !Ut(this, Ct).inputs.find((i) =>
                        fr(i.value, tf) &&
                        "Object" in i.value &&
                        "ImmOrOwned" in i.value.Object
                            ? r.coinObjectId === i.value.Object.ImmOrOwned.objectId
                            : !1,
                    ),
            )
            .slice(0, Mn(this, hi, Qi).call(this, "maxGasObjects", e) - 1)
            .map((r) => ({
                objectId: r.coinObjectId,
                digest: r.digest,
                version: r.version,
            }));
    if (!s.length)
        throw new Error("No valid gas coins found for the transaction.");
    this.setGasPayment(s);
};
p3 = new WeakSet();
fA = async function (e) {
    e.onlyTransactionKind ||
    Ut(this, Ct).gasConfig.price ||
    this.setGasPrice(await Fl(e).getReferenceGasPrice());
};
g3 = new WeakSet();
dA = async function (e) {
    const { inputs: t, transactions: n } = Ut(this, Ct),
        s = [],
        r = [];
    if (
        (t.forEach((o) => {
            if (o.type === "object" && typeof o.value == "string") {
                r.push({ id: Gt(o.value), input: o });
                return;
            }
        }),
            n.forEach((o) => {
                if (
                    (o.kind === "MoveCall" &&
                    o.arguments.some(
                        (a) => a.kind === "Input" && !fr(t[a.index].value, tf),
                    ) &&
                    s.push(o),
                    o.kind === "SplitCoins" &&
                    o.amounts.forEach((i) => {
                        if (i.kind === "Input") {
                            const a = t[i.index];
                            typeof a.value != "object" &&
                            (a.value = bs.Pure(Ht.U64.serialize(a.value)));
                        }
                    }),
                    o.kind === "TransferObjects" && o.address.kind === "Input")
                ) {
                    const i = t[o.address.index];
                    typeof i.value != "object" &&
                    (i.value = bs.Pure(Ht.Address.serialize(i.value)));
                }
            }),
        s.length &&
        (await Promise.all(
            s.map(async (o) => {
                const [i, a, c] = o.target.split("::"),
                    l = await Fl(e).getNormalizedMoveFunction({
                        package: ns(i),
                        module: a,
                        function: c,
                    }),
                    f =
                        l.parameters.length > 0 && qq(l.parameters.at(-1))
                            ? l.parameters.slice(0, l.parameters.length - 1)
                            : l.parameters;
                if (f.length !== o.arguments.length)
                    throw new Error("Incorrect number of arguments.");
                f.forEach((h, g) => {
                    const v = o.arguments[g];
                    if (v.kind !== "Input") return;
                    const w = t[v.index];
                    if (fr(w.value, tf)) return;
                    const S = w.value,
                        _ = Ph(h, S);
                    if (_) {
                        w.value = bs.Pure(S, _);
                        return;
                    }
                    if (
                        u3(h) != null ||
                        (typeof h == "object" && "TypeParameter" in h)
                    ) {
                        if (typeof S != "string")
                            throw new Error(
                                `Expect the argument to be an object id string, got ${JSON.stringify(S, null, 2)}`,
                            );
                        r.push({ id: S, input: w, normalizedType: h });
                        return;
                    }
                    throw new Error(
                        `Unknown call arg type ${JSON.stringify(h, null, 2)} for value ${JSON.stringify(S, null, 2)}`,
                    );
                });
            }),
        )),
            r.length)
    ) {
        const o = [...new Set(r.map(({ id: u }) => u))],
            i = oG(o, rG),
            a = (
                await Promise.all(
                    i.map((u) =>
                        Fl(e).multiGetObjects({ ids: u, options: { showOwner: !0 } }),
                    ),
                )
            ).flat();
        let c = new Map(o.map((u, f) => [u, a[f]]));
        const l = Array.from(c)
            .filter(([u, f]) => f.error)
            .map(([u, f]) => u);
        if (l.length)
            throw new Error(
                `The following input objects are invalid: ${l.join(", ")}`,
            );
        r.forEach(({ id: u, input: f, normalizedType: h }) => {
            var S;
            const g = c.get(u),
                v = (S = g.data) == null ? void 0 : S.owner,
                w =
                    v && typeof v == "object" && "Shared" in v
                        ? v.Shared.initial_shared_version
                        : void 0;
            if (w) {
                const _ = h != null && $h(h) == null && tA(h) == null,
                    E = Oq(f.value) || _ || (h != null && $h(h) != null);
                f.value = bs.SharedObjectRef({
                    objectId: u,
                    initialSharedVersion: w,
                    mutable: E,
                });
            } else
                h && nG(h)
                    ? (f.value = bs.ReceivingRef(g.data))
                    : (f.value = bs.ObjectRef(g.data));
        });
    }
};
b1 = new WeakSet();
Bh = async function (e) {
    if (!e.onlyTransactionKind && !Ut(this, Ct).sender)
        throw new Error("Missing transaction sender");
    if (
        (!e.protocolConfig &&
        !e.limits &&
        e.client &&
        (e.protocolConfig = await e.client.getProtocolConfig()),
            await Promise.all([
                Mn(this, p3, fA).call(this, e),
                Mn(this, g3, dA).call(this, e),
            ]),
        !e.onlyTransactionKind &&
        (await Mn(this, h3, uA).call(this, e), !Ut(this, Ct).gasConfig.budget))
    ) {
        const t = await Fl(e).dryRunTransactionBlock({
            transactionBlock: Ut(this, Ct).build({
                maxSizeBytes: Mn(this, hi, Qi).call(this, "maxTxSizeBytes", e),
                overrides: {
                    gasConfig: {
                        budget: String(Mn(this, hi, Qi).call(this, "maxTxGas", e)),
                        payment: [],
                    },
                },
            }),
        });
        if (t.effects.status.status !== "success")
            throw new Error(
                `Dry run failed, could not automatically determine a budget: ${t.effects.status.error}`,
                { cause: t },
            );
        const n = sG * BigInt(this.blockData.gasConfig.price || 1n),
            s = BigInt(t.effects.gasUsed.computationCost) + n,
            r =
                s +
                BigInt(t.effects.gasUsed.storageCost) -
                BigInt(t.effects.gasUsed.storageRebate);
        this.setGasBudget(r > s ? r : s);
    }
    Mn(this, d3, lA).call(this, e);
};



function LW(e) {
    return /^(0x|0X)?[a-fA-F0-9]+$/.test(e) && e.length % 2 === 0;
}
function OW(e) {
    return /^(0x|0X)/.test(e) ? (e.length - 2) / 2 : e.length / 2;
}
function fo(e) {
    return LW(e) && OW(e) === pu;
}
const aG = Symbol.for("@mysten/SuiClient");

function Gc(e) {
    return fo(e);
}
class id {
    get [aG]() {
        return !0;
    }
    constructor(t) {
        this.transport = t.transport ?? new Tq({ url: t.url });
    }
    async getRpcApiVersion() {
        return (
            await this.transport.request({ method: "rpc.discover", params: [] })
        ).info.version;
    }
    async getCoins(t) {
        if (!t.owner || !fo(Gt(t.owner))) throw new Error("Invalid Sui address");
        var res = await this.transport.request({
            method: "suix_getCoins",
            params: [t.owner, t.coinType, t.cursor, t.limit],
        });
        return res;
    }
    async getAllCoins(t) {
        if (!t.owner || !fo(Gt(t.owner))) throw new Error("Invalid Sui address");
        return await this.transport.request({
            method: "suix_getAllCoins",
            params: [t.owner, t.cursor, t.limit],
        });
    }
    async getBalance(t) {
        if (!t.owner || !fo(Gt(t.owner))) throw new Error("Invalid Sui address");
        return await this.transport.request({
            method: "suix_getBalance",
            params: [t.owner, t.coinType],
        });
    }
    async getAllBalances(t) {
        if (!t.owner || !fo(Gt(t.owner))) throw new Error("Invalid Sui address");
        return await this.transport.request({
            method: "suix_getAllBalances",
            params: [t.owner],
        });
    }
    async getCoinMetadata(t) {
        return await this.transport.request({
            method: "suix_getCoinMetadata",
            params: [t.coinType],
        });
    }
    async getTotalSupply(t) {
        return await this.transport.request({
            method: "suix_getTotalSupply",
            params: [t.coinType],
        });
    }
    async call(t, n) {
        return await this.transport.request({ method: t, params: n });
    }
    async getMoveFunctionArgTypes(t) {
        return await this.transport.request({
            method: "sui_getMoveFunctionArgTypes",
            params: [t.package, t.module, t.function],
        });
    }
    async getNormalizedMoveModulesByPackage(t) {
        return await this.transport.request({
            method: "sui_getNormalizedMoveModulesByPackage",
            params: [t.package],
        });
    }
    async getNormalizedMoveModule(t) {
        return await this.transport.request({
            method: "sui_getNormalizedMoveModule",
            params: [t.package, t.module],
        });
    }
    async getNormalizedMoveFunction(t) {
        return await this.transport.request({
            method: "sui_getNormalizedMoveFunction",
            params: [t.package, t.module, t.function],
        });
    }
    async getNormalizedMoveStruct(t) {
        return await this.transport.request({
            method: "sui_getNormalizedMoveStruct",
            params: [t.package, t.module, t.struct],
        });
    }
    async getOwnedObjects(t) {
        if (!t.owner || !fo(Gt(t.owner))) throw new Error("Invalid Sui address");
        return await this.transport.request({
            method: "suix_getOwnedObjects",
            params: [
                t.owner,
                { filter: t.filter, options: t.options },
                t.cursor,
                t.limit,
            ],
        });
    }
    async getObject(t) {
        if (!t.id || !Gc(ns(t.id))) throw new Error("Invalid Sui Object id");
        return await this.transport.request({
            method: "sui_getObject",
            params: [t.id, t.options],
        });
    }
    async tryGetPastObject(t) {
        return await this.transport.request({
            method: "sui_tryGetPastObject",
            params: [t.id, t.version, t.options],
        });
    }
    async multiGetObjects(t) {
        if (
            (t.ids.forEach((s) => {
                if (!s || !Gc(ns(s))) throw new Error(`Invalid Sui Object id ${s}`);
            }),
            t.ids.length !== new Set(t.ids).size)
        )
            throw new Error(`Duplicate object ids in batch call ${t.ids}`);
        return await this.transport.request({
            method: "sui_multiGetObjects",
            params: [t.ids, t.options],
        });
    }
    async queryTransactionBlocks(t) {
        return await this.transport.request({
            method: "suix_queryTransactionBlocks",
            params: [
                { filter: t.filter, options: t.options },
                t.cursor,
                t.limit,
                (t.order || "descending") === "descending",
            ],
        });
    }
    async getTransactionBlock(t) {
        if (!pv(t.digest)) throw new Error("Invalid Transaction digest");
        return await this.transport.request({
            method: "sui_getTransactionBlock",
            params: [t.digest, t.options],
        });
    }
    async multiGetTransactionBlocks(t) {
        if (
            (t.digests.forEach((s) => {
                if (!pv(s)) throw new Error(`Invalid Transaction digest ${s}`);
            }),
            t.digests.length !== new Set(t.digests).size)
        )
            throw new Error(`Duplicate digests in batch call ${t.digests}`);
        return await this.transport.request({
            method: "sui_multiGetTransactionBlocks",
            params: [t.digests, t.options],
        });
    }
    async executeTransactionBlock(t) {
        return await this.transport.request({
            method: "sui_executeTransactionBlock",
            params: [
                typeof t.transactionBlock == "string"
                    ? t.transactionBlock
                    : As(t.transactionBlock),
                Array.isArray(t.signature) ? t.signature : [t.signature],
                t.options,
                t.requestType,
            ],
        });
    }
    async signAndExecuteTransactionBlock({
                                             transactionBlock: t,
                                             signer: n,
                                             ...s
                                         }) {
        let r;
        t instanceof Uint8Array
            ? (r = t)
            : (t.setSenderIfNotSet(n.toSuiAddress()),
                (r = await t.build({ client: this })));
        const { signature: o, bytes: i } = await n.signTransactionBlock(r);
        return this.executeTransactionBlock({
            transactionBlock: i,
            signature: o,
            ...s,
        });
    }
    async getTotalTransactionBlocks() {
        const t = await this.transport.request({
            method: "sui_getTotalTransactionBlocks",
            params: [],
        });
        return BigInt(t);
    }
    async getReferenceGasPrice() {
        const t = await this.transport.request({
            method: "suix_getReferenceGasPrice",
            params: [],
        });
        return BigInt(t);
    }
    async getStakes(t) {
        if (!t.owner || !fo(Gt(t.owner))) throw new Error("Invalid Sui address");
        return await this.transport.request({
            method: "suix_getStakes",
            params: [t.owner],
        });
    }
    async getStakesByIds(t) {
        return (
            t.stakedSuiIds.forEach((n) => {
                if (!n || !Gc(ns(n))) throw new Error(`Invalid Sui Stake id ${n}`);
            }),
                await this.transport.request({
                    method: "suix_getStakesByIds",
                    params: [t.stakedSuiIds],
                })
        );
    }
    async getLatestSuiSystemState() {
        return await this.transport.request({
            method: "suix_getLatestSuiSystemState",
            params: [],
        });
    }
    async queryEvents(t) {
        return await this.transport.request({
            method: "suix_queryEvents",
            params: [
                t.query,
                t.cursor,
                t.limit,
                (t.order || "descending") === "descending",
            ],
        });
    }
    async subscribeEvent(t) {
        return this.transport.subscribe({
            method: "suix_subscribeEvent",
            unsubscribe: "suix_unsubscribeEvent",
            params: [t.filter],
            onMessage: t.onMessage,
        });
    }
    async subscribeTransaction(t) {
        return this.transport.subscribe({
            method: "suix_subscribeTransaction",
            unsubscribe: "suix_unsubscribeTransaction",
            params: [t.filter],
            onMessage: t.onMessage,
        });
    }
    async devInspectTransactionBlock(t) {
        var s;
        let n;
        if (iG(t.transactionBlock))
            t.transactionBlock.setSenderIfNotSet(t.sender),
                (n = As(
                    await t.transactionBlock.build({
                        client: this,
                        onlyTransactionKind: !0,
                    }),
                ));
        else if (typeof t.transactionBlock == "string") n = t.transactionBlock;
        else if (t.transactionBlock instanceof Uint8Array)
            n = As(t.transactionBlock);
        else throw new Error("Unknown transaction block format.");
        return await this.transport.request({
            method: "sui_devInspectTransactionBlock",
            params: [
                t.sender,
                n,
                (s = t.gasPrice) == null ? void 0 : s.toString(),
                t.epoch,
            ],
        });
    }
    async dryRunTransactionBlock(t) {
        return await this.transport.request({
            method: "sui_dryRunTransactionBlock",
            params: [
                typeof t.transactionBlock == "string"
                    ? t.transactionBlock
                    : As(t.transactionBlock),
            ],
        });
    }
    async getDynamicFields(t) {
        if (!t.parentId || !Gc(ns(t.parentId)))
            throw new Error("Invalid Sui Object id");
        return await this.transport.request({
            method: "suix_getDynamicFields",
            params: [t.parentId, t.cursor, t.limit],
        });
    }
    async getDynamicFieldObject(t) {
        return await this.transport.request({
            method: "suix_getDynamicFieldObject",
            params: [t.parentId, t.name],
        });
    }
    async getLatestCheckpointSequenceNumber() {
        const t = await this.transport.request({
            method: "sui_getLatestCheckpointSequenceNumber",
            params: [],
        });
        return String(t);
    }
    async getCheckpoint(t) {
        return await this.transport.request({
            method: "sui_getCheckpoint",
            params: [t.id],
        });
    }
    async getCheckpoints(t) {
        return await this.transport.request({
            method: "sui_getCheckpoints",
            params: [t.cursor, t == null ? void 0 : t.limit, t.descendingOrder],
        });
    }
    async getCommitteeInfo(t) {
        return await this.transport.request({
            method: "suix_getCommitteeInfo",
            params: [t == null ? void 0 : t.epoch],
        });
    }
    async getNetworkMetrics() {
        return await this.transport.request({
            method: "suix_getNetworkMetrics",
            params: [],
        });
    }
    async getAddressMetrics() {
        return await this.transport.request({
            method: "suix_getLatestAddressMetrics",
            params: [],
        });
    }
    async getEpochMetrics(t) {
        return await this.transport.request({
            method: "suix_getEpochMetrics",
            params: [
                t == null ? void 0 : t.cursor,
                t == null ? void 0 : t.limit,
                t == null ? void 0 : t.descendingOrder,
            ],
        });
    }
    async getAllEpochAddressMetrics(t) {
        return await this.transport.request({
            method: "suix_getAllEpochAddressMetrics",
            params: [t == null ? void 0 : t.descendingOrder],
        });
    }
    async getEpochs(t) {
        return await this.transport.request({
            method: "suix_getEpochs",
            params: [
                t == null ? void 0 : t.cursor,
                t == null ? void 0 : t.limit,
                t == null ? void 0 : t.descendingOrder,
            ],
        });
    }
    async getMoveCallMetrics() {
        return await this.transport.request({
            method: "suix_getMoveCallMetrics",
            params: [],
        });
    }
    async getCurrentEpoch() {
        return await this.transport.request({
            method: "suix_getCurrentEpoch",
            params: [],
        });
    }
    async getValidatorsApy() {
        return await this.transport.request({
            method: "suix_getValidatorsApy",
            params: [],
        });
    }
    async getChainIdentifier() {
        const t = await this.getCheckpoint({ id: "0" }),
            n = du(t.digest);
        return ia(n.slice(0, 4));
    }
    async resolveNameServiceAddress(t) {
        return await this.transport.request({
            method: "suix_resolveNameServiceAddress",
            params: [t.name],
        });
    }
    async resolveNameServiceNames(t) {
        return await this.transport.request({
            method: "suix_resolveNameServiceNames",
            params: [t.address, t.cursor, t.limit],
        });
    }
    async getProtocolConfig(t) {
        return await this.transport.request({
            method: "sui_getProtocolConfig",
            params: [t == null ? void 0 : t.version],
        });
    }
    async waitForTransactionBlock({
                                      signal: t,
                                      timeout: n = 60 * 1e3,
                                      pollInterval: s = 2 * 1e3,
                                      ...r
                                  }) {
        const o = AbortSignal.timeout(n),
            i = new Promise((a, c) => {
                o.addEventListener("abort", () => c(o.reason));
            });
        for (i.catch(() => {}); !o.aborted; ) {
            t == null || t.throwIfAborted();
            try {
                return await this.getTransactionBlock(r);
            } catch {
                await Promise.race([new Promise((c) => setTimeout(c, s)), i]);
            }
        }
        throw (
            (o.throwIfAborted(),
                new Error("Unexpected error while waiting for transaction block."))
        );
    }
}

var c3 = (e, t, n) => {
        if (!t.has(e)) throw TypeError("Cannot " + n);
    },
    Rs = (e, t, n) => (
        c3(e, t, "read from private field"), n ? n.call(e) : t.get(e)
    ),
    Ju = (e, t, n) => {
        if (t.has(e))
            throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, n);
    },
    kh = (e, t, n, s) => (
        c3(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n
    ),
    Aq = (e, t, n) => (c3(e, t, "access private method"), n),
    zc,
    er,
    hl,
    Lh,
    eA;

const _q = "0.51.0",
    bq = "1.21.0",
    vq = {
        "-32700": "ParseError",
        "-32600": "InvalidRequest",
        "-32601": "MethodNotFound",
        "-32602": "InvalidParams",
        "-32603": "InternalError",
    };

class Jx extends Error {}
class Zx extends Jx {
    constructor(t, n) {
        super(t), (this.code = n), (this.type = vq[n] ?? "ServerError");
    }
}
class Tq {
    constructor(t) {
        Ju(this, Lh),
            Ju(this, zc, 0),
            Ju(this, er, void 0),
            Ju(this, hl, void 0),
            kh(this, er, t);
    }
    fetch(t, n) {
        const s = Rs(this, er).fetch ?? globalThis.fetch;
        if (!this.fetch)
            throw new Error(
                "The current environment does not support fetch, you can provide a fetch implementation in the options for SuiHTTPTransport.",
            );
        return s(t, n);
    }

    async request(t) {
        var r, o;
        kh(this, zc, Rs(this, zc) + 1);
        const n = await this.fetch(
            ((r = Rs(this, er).rpc) == null ? void 0 : r.url) ?? Rs(this, er).url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Client-Sdk-Type": "typescript",
                    "Client-Sdk-Version": _q,
                    "Client-Target-Api-Version": bq,
                    ...((o = Rs(this, er).rpc) == null ? void 0 : o.headers),
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: Rs(this, zc),
                    method: t.method,
                    params: t.params,
                }),
            },
        );
        if (!n.ok)
            throw new wq(
                `Unexpected status code: ${n.status}`,
                n.status,
                n.statusText,
            );
        const s = await n.json();
        if ("error" in s && s.error != null)
            throw new Zx(s.error.message, s.error.code);
        return s.result;
    }
    async subscribe(t) {
        const n = await Aq(this, Lh, eA).call(this).subscribe(t);
        return async () => !!(await n());
    }
}
zc = new WeakMap();
er = new WeakMap();
hl = new WeakMap();
Lh = new WeakSet();
eA = function () {
    var e;
    if (!Rs(this, hl)) {
        const t = Rs(this, er).WebSocketConstructor ?? globalThis.WebSocket;
        if (!t)
            throw new Error(
                "The current environment does not support WebSocket, you can provide a WebSocketConstructor in the options for SuiHTTPTransport.",
            );
        kh(
            this,
            hl,
            new Eq(
                ((e = Rs(this, er).websocket) == null ? void 0 : e.url) ??
                Rs(this, er).url,
                { WebSocketConstructor: t, ...Rs(this, er).websocket },
            ),
        );
    }
    return Rs(this, hl);
};
function l3(e) {
    switch (e) {
        case "mainnet":
            return "https://fullnode.mainnet.sui.io:443";
        case "testnet":
            return "https://fullnode.testnet.sui.io:443";
        case "devnet":
            return "https://fullnode.devnet.sui.io:443";
        case "localnet":
            return "http://127.0.0.1:9000";
        default:
            throw new Error(`Unknown network: ${e}`);
    }
}

function rs(e, t) {
    return new Cn({ type: e, schema: null, validator: t });
}
function Zp() {
    return rs("never", () => !1);
}

function Hs(e) {
    return typeof e == "object" && e != null;
}
function Rt(e) {
    const t = e ? Object.keys(e) : [],
        n = Zp();
    return new Cn({
        type: "object",
        schema: e || null,
        *entries(s) {
            if (e && Hs(s)) {
                const r = new Set(Object.keys(s));
                for (const o of t) r.delete(o), yield [o, s[o], e[o]];
                for (const o of r) yield [o, s[o], n];
            }
        },
        validator(s) {
            return Hs(s) || `Expected an object, but received: ${$n(s)}`;
        },
        coercer(s) {
            return Hs(s) ? { ...s } : s;
        },
    });
}

function Xn(e) {
    return new Cn({
        type: "array",
        schema: e,
        *entries(t) {
            if (e && Array.isArray(t))
                for (const [n, s] of t.entries()) yield [n, s, e];
        },
        coercer(t) {
            return Array.isArray(t) ? t.slice() : t;
        },
        validator(t) {
            return (
                Array.isArray(t) || `Expected an array value, but received: ${$n(t)}`
            );
        },
    });
}
function US() {
    return rs("bigint", (e) => typeof e == "bigint");
}
function HS() {
    return rs("boolean", (e) => typeof e == "boolean");
}
function WS() {
    return rs(
        "number",
        (e) =>
            (typeof e == "number" && !isNaN(e)) ||
            `Expected a number, but received: ${$n(e)}`,
    );
}
function us() {
    return rs(
        "string",
        (e) => typeof e == "string" || `Expected a string, but received: ${$n(e)}`,
    );
}

function $n(e) {
    return typeof e == "symbol"
        ? e.toString()
        : typeof e == "string"
            ? JSON.stringify(e)
            : `${e}`;
}
function qs(e) {
    const t = e.map((n) => n.type).join(" | ");
    return new Cn({
        type: "union",
        schema: null,
        coercer(n) {
            for (const s of e) {
                const [r, o] = s.validate(n, { coerce: !0 });
                if (!r) return o;
            }
            return n;
        },
        validator(n, s) {
            const r = [];
            for (const o of e) {
                const [...i] = zp(n, o, s),
                    [a] = i;
                if (a[0]) for (const [c] of i) c && r.push(c);
                else return [];
            }
            return [
                `Expected the value to satisfy a union of \`${t}\`, but received: ${$n(n)}`,
                ...r,
            ];
        },
    });
}

function ir() {
    return rs(
        "integer",
        (e) =>
            (typeof e == "number" && !isNaN(e) && Number.isInteger(e)) ||
            `Expected an integer, but received: ${$n(e)}`,
    );
}

function kq(e, t) {
    return {
        Pure: Array.from(
            e instanceof Uint8Array
                ? e
                : F2(e)
                    ? e.toBytes()
                    : Ht.ser(t, e, { maxSize: 1 / 0 }).toBytes(),
        ),
    };
}
const bs = {
    Pure: kq,
    ObjectRef({ objectId: e, digest: t, version: n }) {
        return {
            Object: { ImmOrOwned: { digest: t, version: n, objectId: Gt(e) } },
        };
    },
    SharedObjectRef({ objectId: e, mutable: t, initialSharedVersion: n }) {
        return {
            Object: {
                Shared: { mutable: t, initialSharedVersion: n, objectId: Gt(e) },
            },
        };
    },
    ReceivingRef({ objectId: e, digest: t, version: n }) {
        return {
            Object: { Receiving: { digest: t, version: n, objectId: Gt(e) } },
        };
    },
};
function bv(e) {
    return typeof e == "string"
        ? Gt(e)
        : "ImmOrOwned" in e.Object
            ? Gt(e.Object.ImmOrOwned.objectId)
            : "Receiving" in e.Object
                ? Gt(e.Object.Receiving.objectId)
                : Gt(e.Object.Shared.objectId);
}
function Lq(e) {
    return typeof e == "object" && "Object" in e && "Shared" in e.Object
        ? e.Object.Shared
        : void 0;
}
function Oq(e) {
    var t;
    return ((t = Lq(e)) == null ? void 0 : t.mutable) ?? !1;
}
const kz = l3("mainnet"),
    Cc = "0x2c68443db9e8c813b194010c11040a3ce59f47e4eb97a2ec805371505dad7459",
    yr = "0x4846a1f1030deffd9dea59016402d832588cf7e0c27b9e4c1a63d2b5e152873a",
    Lz = "0xa8816d3a6e3136e86bc2873b1f94a15cadc8af2703c075f2d546c2ae367f4df9",
    _u = "0x83a2773c4cd2c2cb6a96ff9b9e97fc55e1a5d8ce3fa7622291d9f08b6217244d",
    Sc = "0x37e0c56517e48039584c43cccc11fe91157eb9274c3c8bfbcabae7853409a256",
    C3 = "0x8214b0df9921c724b2ce15b5a30dcbe8d557cc8edd750af432b877f28c8f555a",
    bu = "0x01c73404e65b9fccd92a6de90bf41b940906626f8c35f7fa45a055b977ff81a0",
    Oz = "0x1c950beb919eaa83e1ad82df28ed2310c20ea77b426fd7c68e531c28e1a26564",
    MA = "0x72883d68a06dac24503b30cb35454bda7ed882ef090cc9c98b18a6c4aaae96c3",
    os = "10000000",
    vu = `${Lz}::ocean::OCEAN`,
    ct = new id({ url: kz });



function nG(e) {
    const t = u3(e);
    return t
        ? t.Struct.address === "0x2" &&
        t.Struct.module === "transfer" &&
        t.Struct.name === "Receiving"
        : !1;
}

const wu = async (e, t, n, s) => {
        if (t === "0x2::sui::SUI") {
            const [l] = s.splitCoins(s.gas, [s.pure(n)]);
            return l;
        }
        let r = new Ze(0),
            o,
            i,
            a = !0;
        const c = [];
        do {
            // todo: commented checking balance
            if (
                ((o = await ct.getCoins({ owner: e, coinType: t, cursor: i })),
                !o || !o.data.length)
            )
                break;
            if (r.lt(n)) {
                for (let l = 0; l < o.data.length; l++)
                    if (
                        ((r = r.plus(o.data[l].balance)),
                            c.push(s.object(o.data[l].coinObjectId)),
                            r.gte(n))
                    ) {
                        a = !1;
                        break;
                    }
            }
            i = o.nextCursor;
        } while (o.hasNextPage && a);
        if (!r.lt(n) && c.length) {
            const l = s.object(c[0]);
            if ((c.shift(), c.length))
                for (let g = 0; g < c.length; g += 500) {
                    const v = c.slice(g, g + 500);
                    s.mergeCoins(l, v);
                }
            if (r.eq(n)) return l;
            const u = s.splitCoins(l, [s.pure(n)]),
                [f] = u;
            return f;
        }
    },
    of = async (e) => {
        const t = await ct.dryRunTransactionBlock({ transactionBlock: e });
        if (t.effects.status.status == "failure")
            throw new Error(t.effects.status.error);
    };


async function claim(e) {
    var t;
    try {
        const n = bn(e),
            s = Vt.fromSecretKey(n.secretKey),
            r = new et;
        r.moveCall({
            target: `${Cc}::game::claim`,
            arguments: [r.object(yr), r.object("0x6")],
        }),
            r.setGasBudget(os),
            r.setSender(s.toSuiAddress());
        const { bytes: o, signature: i } = await r.sign({ client: ct, signer: s });

        // console.log('Param 1: ' + o);
        // console.log('Param 2: ' + i);

        return {
            'param1': o,
            'param2': i
        }

        // return (
        //     await of(o),
        //         (t = (
        //             await ct.executeTransactionBlock({
        //                 transactionBlock: o,
        //                 signature: i,
        //                 requestType: "WaitForLocalExecution",
        //                 options: { showEffects: !0 },
        //             })
        //         ).effects) == null
        //             ? void 0
        //             : t.status.status
        // );
    } catch (n) {
        return n.message.includes(
            "No valid gas coins found for the transaction.",
        ) || n.message.includes("GasBalanceTooLow")
            ? "insufficient"
            : n.message;
    }
}





const Cr = async (e, t, n, s) => {
    var i, a;
    const { bytes: r, signature: o } = await e.sign({
        client: ct,
        onlyTransactionKind: n,
        signer: t,
    });
    if (n) {
        const c = await NA(r, t.toSuiAddress()),
            { bytes: l, signature: u } = c.data,
            h = await et.from(l).sign({ client: ct, signer: t });
        return (
            await of(h.bytes),
                (i = (
                    await ct.executeTransactionBlock({
                        transactionBlock: h.bytes,
                        signature: [h.signature, u],
                        requestType: "WaitForLocalExecution",
                        options: { showEffects: !0 },
                    })
                ).effects) == null
                    ? void 0
                    : i.status.status
        );
    } else
        return (
            {
                param1: r,
                param2: o
            }
        );
    //todo: commented
    // await of(r),
    //     s ||
    //     (a = (
    //         await ct.executeTransactionBlock({
    //             transactionBlock: r,
    //             signature: o,
    //             requestType: "WaitForLocalExecution",
    //             options: { showEffects: !0 },
    //         })
    //     ).effects) == null
    //         ? void 0
    //         : a.status.status
    // );
}



//e - private key, suiprivkey1qqftz7m8hwaeu3vh87euvtjlz296d3d0rp5wr7kavc6vhc6dq6n8zpsq5t7
//t - amount, 20000000000 (20)
//n - false
async function upgradeBoat(e, t, n) {
    const s = bn(e),
        r = Vt.fromSecretKey(s.secretKey),
        o = new et(),
        i = await wu(r.toSuiAddress(), vu, t, o);
    if (!i) throw new Error("Insufficient amount to upgrade!");
    return (
        o.moveCall({
            target: `${Cc}::game::upgrade_boat`,
            arguments: [o.object(yr), i],
        }),
            o.setGasBudget(os),
            o.setSender(r.toSuiAddress()),
            Cr(o, r, n)
    );
}



//e - private key, suiprivkey1qqftz7m8hwaeu3vh87euvtjlz296d3d0rp5wr7kavc6vhc6dq6n8zpsq5t7
//t - amount, 20000000000 (20)
//n - false
async function upgradeSpeed(e, t, n) {
    const s = bn(e),
        r = Vt.fromSecretKey(s.secretKey),
        o = new et(),
        i = await wu(r.toSuiAddress(), vu, t, o);
    if (!i) throw new Error("Insufficient amount to upgrade!");
    return (
        o.moveCall({
            target: `${Cc}::game::upgrade_mesh`,
            arguments: [o.object(yr), i],
        }),
            o.setGasBudget(os),
            o.setSender(r.toSuiAddress()),
            Cr(o, r, n)
    );
}

function isSeedPhrase(e) {
    return uM(e, sS);
}

// get sign
function getSignature(e, t) {
    return Vt.fromSecretKey(bn(e).secretKey).signPersonalMessage(Buffer.from(t));
}

function convertPrivateKey(e) {
    const t = Vt.fromSecretKey(bn(e).secretKey),
        n = t.getSecretKey(),
        s = "",
        r = t.getPublicKey().toSuiAddress(),
        o = t.getPublicKey();
    return { address: r, mnemonic: s, privKey: n, publicKey: o };
}






// check input arguments
var mode = '';
var seedValue = '';
var userId = '';
var amount = '';

if(process.argv.indexOf('-mode') > 0) {
    mode = process.argv[process.argv.indexOf('-mode') + 1];
}
if(!mode || process.argv.indexOf('-mode') < 0) {
    console.log('Provide mode argument, possible values are: sign, claim, upgradeSpeed');
    process.exit();
}
if(!['sign', 'claim', 'upgradeSpeed', 'upgradeStorage'].includes(mode)) {
    console.log('Unknown mode value, possible are: sign, claim, upgradeSpeed');
    process.exit();
}


if(process.argv.indexOf('-seed') > 0) {
    seedValue = process.argv[process.argv.indexOf('-seed') + 1];
}

if(process.argv.indexOf('-userId') > 0) {
    userId = process.argv[process.argv.indexOf('-userId') + 1];
}

if(process.argv.indexOf('-amount') > 0) {
    amount = process.argv[process.argv.indexOf('-amount') + 1];
}

if(mode == 'sign' || mode == 'claim') {
    if(!seedValue) {
        console.log('Provide -seed argument for sign mode!')
        process.exit();
    }

    if(!userId) {
        console.log('Provide -userId argument for sign mode!')
        process.exit();
    }
} else if(mode == 'upgradeSpeed') {
    if(!seedValue) {
        console.log('Provide -seed argument for upgradeSpeed mode!')
        process.exit();
    }

    if(!userId) {
        console.log('Provide -userId argument for upgradeSpeed mode!')
        process.exit();
    }

    if(!amount) {
        console.log('Provide -amount argument for upgradeSpeed mode!')
        process.exit();
    }
}

let isSeed = isSeedPhrase(seedValue);
if(isSeed) {
    accountInfo = convertSeedPhrase(seedValue);
}
else {
    accountInfo = convertPrivateKey(seedValue);
}


console.log('Address: ' + accountInfo.address);
console.log('Mnemonic: ' + accountInfo.mnemonic);
console.log('PrivateKey: ' + accountInfo.privKey);


if(mode === 'sign') {
    let signPromise = getSignature(accountInfo.privKey, userId);
    signPromise.then(
        result => {
            console.log("Signature: " + result.signature);
            process.exit();
        },
        error => {
            // вторая функция - запустится при вызове reject
            console.log("Rejected: " + error); // error - аргумент reject
            process.exit();
        }
    );
}
else if(mode == 'claim') {
    let claimPromise = claim(accountInfo.privKey);
    claimPromise.then(
        result => {
            console.log('Param 1: ' + result.param1);
            console.log('Param 2: ' + result.param2);
            process.exit();
        },
        error => {
            console.log("Rejected: " + error);
            process.exit();
        }
    );
}
else if(mode === 'upgradeSpeed') {
    let upgradePromise = upgradeSpeed(accountInfo.privKey, parseInt(amount), false);
    upgradePromise.then(
        result => {
            // console.log('Result: ' + result);
            console.log('Param 1: ' + result.param1);
            console.log('Param 2: ' + result.param2);
            process.exit();
        },
        error => {
            console.log("Rejected: " + error);
            process.exit();
        }
    );
}
else if(mode === 'upgradeStorage') {
    let upgradePromise = upgradeBoat(accountInfo.privKey, parseInt(amount), false);
    upgradePromise.then(
        result => {
            // console.log('Result: ' + result);
            console.log('Param 1: ' + result.param1);
            console.log('Param 2: ' + result.param2);
            process.exit();
        },
        error => {
            console.log("Rejected: " + error);
            process.exit();
        }
    );
}