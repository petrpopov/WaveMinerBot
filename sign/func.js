var isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    mathceil = Math.ceil,
    mathfloor = Math.floor,
    bignumberError = "[BigNumber Error] ",
    tooManyDigits =
        bignumberError + "Number primitive has more than 15 significant digits: ",
    BASE = 1e14,
    LOG_BASE = 14,
    MAX_SAFE_INTEGER = 9007199254740991,
    POWS_TEN = [
        1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13,
    ],
    SQRT_BASE = 1e7,
    MAX = 1e9;

    function bitFloor(u) {
        var h = u | 0;
        return u > 0 || u === h ? h : h - 1;
    }
    function coeffToString(u) {
        for (var h, y, v = 1, M = u.length, l = u[0] + ""; v < M; ) {
            for (h = u[v++] + "", y = LOG_BASE - h.length; y--; h = "0" + h);
            l += h;
        }
        for (M = l.length; l.charCodeAt(--M) === 48; );
        return l.slice(0, M + 1 || 1);
    }
function compare(u, h) {
    var y,
        v,
        M = u.c,
        l = h.c,
        x = u.s,
        $ = h.s,
        A = u.e,
        C = h.e;
    if (!x || !$) return null;
    if (((y = M && !M[0]), (v = l && !l[0]), y || v)) return y ? (v ? 0 : -$) : x;
    if (x != $) return x;
    if (((y = x < 0), (v = A == C), !M || !l)) return v ? 0 : !M ^ y ? 1 : -1;
    if (!v) return (A > C) ^ y ? 1 : -1;
    for ($ = (A = M.length) < (C = l.length) ? A : C, x = 0; x < $; x++)
        if (M[x] != l[x]) return (M[x] > l[x]) ^ y ? 1 : -1;
    return A == C ? 0 : (A > C) ^ y ? 1 : -1;
}

function clone(u) {
    var h,
        y,
        v,
        M = (z.prototype = { constructor: z, toString: null, valueOf: null }),
        l = new z(1),
        x = 20,
        $ = 4,
        A = -7,
        C = 21,
        S = -1e7,
        I = 1e7,
        N = !1,
        L = 1,
        X = 0,
        Q = {
            prefix: "",
            groupSize: 3,
            secondaryGroupSize: 0,
            groupSeparator: ",",
            decimalSeparator: ".",
            fractionGroupSize: 0,
            fractionGroupSeparator: " ",
            suffix: "",
        },
        ae = "0123456789abcdefghijklmnopqrstuvwxyz",
        ne = !0;
    function z(Z, D) {
        var re,
            w,
            e,
            n,
            a,
            o,
            d,
            m,
            b = this;
        if (!(b instanceof z)) return new z(Z, D);
        if (D == null) {
            if (Z && Z._isBigNumber === !0) {
                (b.s = Z.s),
                    !Z.c || Z.e > I
                        ? (b.c = b.e = null)
                        : Z.e < S
                            ? (b.c = [(b.e = 0)])
                            : ((b.e = Z.e), (b.c = Z.c.slice()));
                return;
            }
            if ((o = typeof Z == "number") && Z * 0 == 0) {
                if (((b.s = 1 / Z < 0 ? ((Z = -Z), -1) : 1), Z === ~~Z)) {
                    for (n = 0, a = Z; a >= 10; a /= 10, n++);
                    n > I ? (b.c = b.e = null) : ((b.e = n), (b.c = [Z]));
                    return;
                }
                m = String(Z);
            } else {
                if (!isNumeric.test((m = String(Z)))) return v(b, m, o);
                b.s = m.charCodeAt(0) == 45 ? ((m = m.slice(1)), -1) : 1;
            }
            (n = m.indexOf(".")) > -1 && (m = m.replace(".", "")),
                (a = m.search(/e/i)) > 0
                    ? (n < 0 && (n = a), (n += +m.slice(a + 1)), (m = m.substring(0, a)))
                    : n < 0 && (n = m.length);
        } else {
            if ((intCheck(D, 2, ae.length, "Base"), D == 10 && ne))
                return (b = new z(Z)), _e(b, x + b.e + 1, $);
            if (((m = String(Z)), (o = typeof Z == "number"))) {
                if (Z * 0 != 0) return v(b, m, o, D);
                if (
                    ((b.s = 1 / Z < 0 ? ((m = m.slice(1)), -1) : 1),
                    z.DEBUG && m.replace(/^0\.0*|\./, "").length > 15)
                )
                    throw Error(tooManyDigits + Z);
            } else b.s = m.charCodeAt(0) === 45 ? ((m = m.slice(1)), -1) : 1;
            for (re = ae.slice(0, D), n = a = 0, d = m.length; a < d; a++)
                if (re.indexOf((w = m.charAt(a))) < 0) {
                    if (w == ".") {
                        if (a > n) {
                            n = d;
                            continue;
                        }
                    } else if (
                        !e &&
                        ((m == m.toUpperCase() && (m = m.toLowerCase())) ||
                            (m == m.toLowerCase() && (m = m.toUpperCase())))
                    ) {
                        (e = !0), (a = -1), (n = 0);
                        continue;
                    }
                    return v(b, String(Z), o, D);
                }
            (o = !1),
                (m = y(m, D, 10, b.s)),
                (n = m.indexOf(".")) > -1 ? (m = m.replace(".", "")) : (n = m.length);
        }
        for (a = 0; m.charCodeAt(a) === 48; a++);
        for (d = m.length; m.charCodeAt(--d) === 48; );
        if ((m = m.slice(a, ++d))) {
            if (
                ((d -= a),
                o && z.DEBUG && d > 15 && (Z > MAX_SAFE_INTEGER || Z !== mathfloor(Z)))
            )
                throw Error(tooManyDigits + b.s * Z);
            if ((n = n - a - 1) > I) b.c = b.e = null;
            else if (n < S) b.c = [(b.e = 0)];
            else {
                if (
                    ((b.e = n),
                        (b.c = []),
                        (a = (n + 1) % LOG_BASE),
                    n < 0 && (a += LOG_BASE),
                    a < d)
                ) {
                    for (a && b.c.push(+m.slice(0, a)), d -= LOG_BASE; a < d; )
                        b.c.push(+m.slice(a, (a += LOG_BASE)));
                    a = LOG_BASE - (m = m.slice(a)).length;
                } else a -= d;
                for (; a--; m += "0");
                b.c.push(+m);
            }
        } else b.c = [(b.e = 0)];
    }
    (z.clone = clone),
        (z.ROUND_UP = 0),
        (z.ROUND_DOWN = 1),
        (z.ROUND_CEIL = 2),
        (z.ROUND_FLOOR = 3),
        (z.ROUND_HALF_UP = 4),
        (z.ROUND_HALF_DOWN = 5),
        (z.ROUND_HALF_EVEN = 6),
        (z.ROUND_HALF_CEIL = 7),
        (z.ROUND_HALF_FLOOR = 8),
        (z.EUCLID = 9),
        (z.config = z.set =
            function (Z) {
                var D, re;
                if (Z != null)
                    if (typeof Z == "object") {
                        if (
                            (Z.hasOwnProperty((D = "DECIMAL_PLACES")) &&
                            ((re = Z[D]), intCheck(re, 0, MAX, D), (x = re)),
                            Z.hasOwnProperty((D = "ROUNDING_MODE")) &&
                            ((re = Z[D]), intCheck(re, 0, 8, D), ($ = re)),
                            Z.hasOwnProperty((D = "EXPONENTIAL_AT")) &&
                            ((re = Z[D]),
                                re && re.pop
                                    ? (intCheck(re[0], -MAX, 0, D),
                                        intCheck(re[1], 0, MAX, D),
                                        (A = re[0]),
                                        (C = re[1]))
                                    : (intCheck(re, -MAX, MAX, D),
                                        (A = -(C = re < 0 ? -re : re)))),
                                Z.hasOwnProperty((D = "RANGE")))
                        )
                            if (((re = Z[D]), re && re.pop))
                                intCheck(re[0], -MAX, -1, D),
                                    intCheck(re[1], 1, MAX, D),
                                    (S = re[0]),
                                    (I = re[1]);
                            else if ((intCheck(re, -MAX, MAX, D), re))
                                S = -(I = re < 0 ? -re : re);
                            else throw Error(bignumberError + D + " cannot be zero: " + re);
                        if (Z.hasOwnProperty((D = "CRYPTO")))
                            if (((re = Z[D]), re === !!re))
                                if (re)
                                    if (
                                        typeof crypto < "u" &&
                                        crypto &&
                                        (crypto.getRandomValues || crypto.randomBytes)
                                    )
                                        N = re;
                                    else
                                        throw (
                                            ((N = !re), Error(bignumberError + "crypto unavailable"))
                                        );
                                else N = re;
                            else
                                throw Error(bignumberError + D + " not true or false: " + re);
                        if (
                            (Z.hasOwnProperty((D = "MODULO_MODE")) &&
                            ((re = Z[D]), intCheck(re, 0, 9, D), (L = re)),
                            Z.hasOwnProperty((D = "POW_PRECISION")) &&
                            ((re = Z[D]), intCheck(re, 0, MAX, D), (X = re)),
                                Z.hasOwnProperty((D = "FORMAT")))
                        )
                            if (((re = Z[D]), typeof re == "object")) Q = re;
                            else throw Error(bignumberError + D + " not an object: " + re);
                        if (Z.hasOwnProperty((D = "ALPHABET")))
                            if (
                                ((re = Z[D]),
                                typeof re == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(re))
                            )
                                (ne = re.slice(0, 10) == "0123456789"), (ae = re);
                            else throw Error(bignumberError + D + " invalid: " + re);
                    } else throw Error(bignumberError + "Object expected: " + Z);
                return {
                    DECIMAL_PLACES: x,
                    ROUNDING_MODE: $,
                    EXPONENTIAL_AT: [A, C],
                    RANGE: [S, I],
                    CRYPTO: N,
                    MODULO_MODE: L,
                    POW_PRECISION: X,
                    FORMAT: Q,
                    ALPHABET: ae,
                };
            }),
        (z.isBigNumber = function (Z) {
            if (!Z || Z._isBigNumber !== !0) return !1;
            if (!z.DEBUG) return !0;
            var D,
                re,
                w = Z.c,
                e = Z.e,
                n = Z.s;
            e: if ({}.toString.call(w) == "[object Array]") {
                if (
                    (n === 1 || n === -1) &&
                    e >= -MAX &&
                    e <= MAX &&
                    e === mathfloor(e)
                ) {
                    if (w[0] === 0) {
                        if (e === 0 && w.length === 1) return !0;
                        break e;
                    }
                    if (
                        ((D = (e + 1) % LOG_BASE),
                        D < 1 && (D += LOG_BASE),
                        String(w[0]).length == D)
                    ) {
                        for (D = 0; D < w.length; D++)
                            if (((re = w[D]), re < 0 || re >= BASE || re !== mathfloor(re)))
                                break e;
                        if (re !== 0) return !0;
                    }
                }
            } else if (
                w === null &&
                e === null &&
                (n === null || n === 1 || n === -1)
            )
                return !0;
            throw Error(bignumberError + "Invalid BigNumber: " + Z);
        }),
        (z.maximum = z.max =
            function () {
                return oe(arguments, -1);
            }),
        (z.minimum = z.min =
            function () {
                return oe(arguments, 1);
            }),
        (z.random = (function () {
            var Z = 9007199254740992,
                D =
                    (Math.random() * Z) & 2097151
                        ? function () {
                            return mathfloor(Math.random() * Z);
                        }
                        : function () {
                            return (
                                ((Math.random() * 1073741824) | 0) * 8388608 +
                                ((Math.random() * 8388608) | 0)
                            );
                        };
            return function (re) {
                var w,
                    e,
                    n,
                    a,
                    o,
                    d = 0,
                    m = [],
                    b = new z(l);
                if (
                    (re == null ? (re = x) : intCheck(re, 0, MAX),
                        (a = mathceil(re / LOG_BASE)),
                        N)
                )
                    if (crypto.getRandomValues) {
                        for (w = crypto.getRandomValues(new Uint32Array((a *= 2))); d < a; )
                            (o = w[d] * 131072 + (w[d + 1] >>> 11)),
                                o >= 9e15
                                    ? ((e = crypto.getRandomValues(new Uint32Array(2))),
                                        (w[d] = e[0]),
                                        (w[d + 1] = e[1]))
                                    : (m.push(o % 1e14), (d += 2));
                        d = a / 2;
                    } else if (crypto.randomBytes) {
                        for (w = crypto.randomBytes((a *= 7)); d < a; )
                            (o =
                                (w[d] & 31) * 281474976710656 +
                                w[d + 1] * 1099511627776 +
                                w[d + 2] * 4294967296 +
                                w[d + 3] * 16777216 +
                                (w[d + 4] << 16) +
                                (w[d + 5] << 8) +
                                w[d + 6]),
                                o >= 9e15
                                    ? crypto.randomBytes(7).copy(w, d)
                                    : (m.push(o % 1e14), (d += 7));
                        d = a / 7;
                    } else throw ((N = !1), Error(bignumberError + "crypto unavailable"));
                if (!N) for (; d < a; ) (o = D()), o < 9e15 && (m[d++] = o % 1e14);
                for (
                    a = m[--d],
                        re %= LOG_BASE,
                    a &&
                    re &&
                    ((o = POWS_TEN[LOG_BASE - re]), (m[d] = mathfloor(a / o) * o));
                    m[d] === 0;
                    m.pop(), d--
                );
                if (d < 0) m = [(n = 0)];
                else {
                    for (n = -1; m[0] === 0; m.splice(0, 1), n -= LOG_BASE);
                    for (d = 1, o = m[0]; o >= 10; o /= 10, d++);
                    d < LOG_BASE && (n -= LOG_BASE - d);
                }
                return (b.e = n), (b.c = m), b;
            };
        })()),
        (z.sum = function () {
            for (var Z = 1, D = arguments, re = new z(D[0]); Z < D.length; )
                re = re.plus(D[Z++]);
            return re;
        }),
        (y = (function () {
            var Z = "0123456789";
            function D(re, w, e, n) {
                for (var a, o = [0], d, m = 0, b = re.length; m < b; ) {
                    for (d = o.length; d--; o[d] *= w);
                    for (o[0] += n.indexOf(re.charAt(m++)), a = 0; a < o.length; a++)
                        o[a] > e - 1 &&
                        (o[a + 1] == null && (o[a + 1] = 0),
                            (o[a + 1] += (o[a] / e) | 0),
                            (o[a] %= e));
                }
                return o.reverse();
            }
            return function (re, w, e, n, a) {
                var o,
                    d,
                    m,
                    b,
                    c,
                    t,
                    p,
                    _,
                    E = re.indexOf("."),
                    k = x,
                    U = $;
                for (
                    E >= 0 &&
                    ((b = X),
                        (X = 0),
                        (re = re.replace(".", "")),
                        (_ = new z(w)),
                        (t = _.pow(re.length - E)),
                        (X = b),
                        (_.c = D(toFixedPoint(coeffToString(t.c), t.e, "0"), 10, e, Z)),
                        (_.e = _.c.length)),
                        p = D(re, w, e, a ? ((o = ae), Z) : ((o = Z), ae)),
                        m = b = p.length;
                    p[--b] == 0;
                    p.pop()
                );
                if (!p[0]) return o.charAt(0);
                if (
                    (E < 0
                        ? --m
                        : ((t.c = p),
                            (t.e = m),
                            (t.s = n),
                            (t = h(t, _, k, U, e)),
                            (p = t.c),
                            (c = t.r),
                            (m = t.e)),
                        (d = m + k + 1),
                        (E = p[d]),
                        (b = e / 2),
                        (c = c || d < 0 || p[d + 1] != null),
                        (c =
                            U < 4
                                ? (E != null || c) && (U == 0 || U == (t.s < 0 ? 3 : 2))
                                : E > b ||
                                (E == b &&
                                    (U == 4 ||
                                        c ||
                                        (U == 6 && p[d - 1] & 1) ||
                                        U == (t.s < 0 ? 8 : 7)))),
                    d < 1 || !p[0])
                )
                    re = c ? toFixedPoint(o.charAt(1), -k, o.charAt(0)) : o.charAt(0);
                else {
                    if (((p.length = d), c))
                        for (--e; ++p[--d] > e; )
                            (p[d] = 0), d || (++m, (p = [1].concat(p)));
                    for (b = p.length; !p[--b]; );
                    for (E = 0, re = ""; E <= b; re += o.charAt(p[E++]));
                    re = toFixedPoint(re, m, o.charAt(0));
                }
                return re;
            };
        })()),
        (h = (function () {
            function Z(w, e, n) {
                var a,
                    o,
                    d,
                    m,
                    b = 0,
                    c = w.length,
                    t = e % SQRT_BASE,
                    p = (e / SQRT_BASE) | 0;
                for (w = w.slice(); c--; )
                    (d = w[c] % SQRT_BASE),
                        (m = (w[c] / SQRT_BASE) | 0),
                        (a = p * d + m * t),
                        (o = t * d + (a % SQRT_BASE) * SQRT_BASE + b),
                        (b = ((o / n) | 0) + ((a / SQRT_BASE) | 0) + p * m),
                        (w[c] = o % n);
                return b && (w = [b].concat(w)), w;
            }
            function D(w, e, n, a) {
                var o, d;
                if (n != a) d = n > a ? 1 : -1;
                else
                    for (o = d = 0; o < n; o++)
                        if (w[o] != e[o]) {
                            d = w[o] > e[o] ? 1 : -1;
                            break;
                        }
                return d;
            }
            function re(w, e, n, a) {
                for (var o = 0; n--; )
                    (w[n] -= o), (o = w[n] < e[n] ? 1 : 0), (w[n] = o * a + w[n] - e[n]);
                for (; !w[0] && w.length > 1; w.splice(0, 1));
            }
            return function (w, e, n, a, o) {
                var d,
                    m,
                    b,
                    c,
                    t,
                    p,
                    _,
                    E,
                    k,
                    U,
                    F,
                    T,
                    H,
                    V,
                    ee,
                    Y,
                    q,
                    fe = w.s == e.s ? 1 : -1,
                    Oe = w.c,
                    le = e.c;
                if (!Oe || !Oe[0] || !le || !le[0])
                    return new z(
                        !w.s || !e.s || (Oe ? le && Oe[0] == le[0] : !le)
                            ? NaN
                            : (Oe && Oe[0] == 0) || !le
                                ? fe * 0
                                : fe / 0,
                    );
                for (
                    E = new z(fe),
                        k = E.c = [],
                        m = w.e - e.e,
                        fe = n + m + 1,
                    o ||
                    ((o = BASE),
                        (m = bitFloor(w.e / LOG_BASE) - bitFloor(e.e / LOG_BASE)),
                        (fe = (fe / LOG_BASE) | 0)),
                        b = 0;
                    le[b] == (Oe[b] || 0);
                    b++
                );
                if ((le[b] > (Oe[b] || 0) && m--, fe < 0)) k.push(1), (c = !0);
                else {
                    for (
                        V = Oe.length,
                            Y = le.length,
                            b = 0,
                            fe += 2,
                            t = mathfloor(o / (le[0] + 1)),
                        t > 1 &&
                        ((le = Z(le, t, o)),
                            (Oe = Z(Oe, t, o)),
                            (Y = le.length),
                            (V = Oe.length)),
                            H = Y,
                            U = Oe.slice(0, Y),
                            F = U.length;
                        F < Y;
                        U[F++] = 0
                    );
                    (q = le.slice()),
                        (q = [0].concat(q)),
                        (ee = le[0]),
                    le[1] >= o / 2 && ee++;
                    do {
                        if (((t = 0), (d = D(le, U, Y, F)), d < 0)) {
                            if (
                                ((T = U[0]),
                                Y != F && (T = T * o + (U[1] || 0)),
                                    (t = mathfloor(T / ee)),
                                t > 1)
                            )
                                for (
                                    t >= o && (t = o - 1),
                                        p = Z(le, t, o),
                                        _ = p.length,
                                        F = U.length;
                                    D(p, U, _, F) == 1;

                                )
                                    t--, re(p, Y < _ ? q : le, _, o), (_ = p.length), (d = 1);
                            else t == 0 && (d = t = 1), (p = le.slice()), (_ = p.length);
                            if (
                                (_ < F && (p = [0].concat(p)),
                                    re(U, p, F, o),
                                    (F = U.length),
                                d == -1)
                            )
                                for (; D(le, U, Y, F) < 1; )
                                    t++, re(U, Y < F ? q : le, F, o), (F = U.length);
                        } else d === 0 && (t++, (U = [0]));
                        (k[b++] = t),
                            U[0] ? (U[F++] = Oe[H] || 0) : ((U = [Oe[H]]), (F = 1));
                    } while ((H++ < V || U[0] != null) && fe--);
                    (c = U[0] != null), k[0] || k.splice(0, 1);
                }
                if (o == BASE) {
                    for (b = 1, fe = k[0]; fe >= 10; fe /= 10, b++);
                    _e(E, n + (E.e = b + m * LOG_BASE - 1) + 1, a, c);
                } else (E.e = m), (E.r = +c);
                return E;
            };
        })());
    function ce(Z, D, re, w) {
        var e, n, a, o, d;
        if ((re == null ? (re = $) : intCheck(re, 0, 8), !Z.c)) return Z.toString();
        if (((e = Z.c[0]), (a = Z.e), D == null))
            (d = coeffToString(Z.c)),
                (d =
                    w == 1 || (w == 2 && (a <= A || a >= C))
                        ? toExponential(d, a)
                        : toFixedPoint(d, a, "0"));
        else if (
            ((Z = _e(new z(Z), D, re)),
                (n = Z.e),
                (d = coeffToString(Z.c)),
                (o = d.length),
            w == 1 || (w == 2 && (D <= n || n <= A)))
        ) {
            for (; o < D; d += "0", o++);
            d = toExponential(d, n);
        } else if (((D -= a), (d = toFixedPoint(d, n, "0")), n + 1 > o)) {
            if (--D > 0) for (d += "."; D--; d += "0");
        } else if (((D += n - o), D > 0))
            for (n + 1 == o && (d += "."); D--; d += "0");
        return Z.s < 0 && e ? "-" + d : d;
    }
    function oe(Z, D) {
        for (var re, w, e = 1, n = new z(Z[0]); e < Z.length; e++)
            (w = new z(Z[e])),
            (!w.s || (re = compare(n, w)) === D || (re === 0 && n.s === D)) &&
            (n = w);
        return n;
    }
    function Ee(Z, D, re) {
        for (var w = 1, e = D.length; !D[--e]; D.pop());
        for (e = D[0]; e >= 10; e /= 10, w++);
        return (
            (re = w + re * LOG_BASE - 1) > I
                ? (Z.c = Z.e = null)
                : re < S
                    ? (Z.c = [(Z.e = 0)])
                    : ((Z.e = re), (Z.c = D)),
                Z
        );
    }
    v = (function () {
        var Z = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
            D = /^([^.]+)\.$/,
            re = /^\.([^.]+)$/,
            w = /^-?(Infinity|NaN)$/,
            e = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
        return function (n, a, o, d) {
            var m,
                b = o ? a : a.replace(e, "");
            if (w.test(b)) n.s = isNaN(b) ? null : b < 0 ? -1 : 1;
            else {
                if (
                    !o &&
                    ((b = b.replace(Z, function (c, t, p) {
                        return (
                            (m = (p = p.toLowerCase()) == "x" ? 16 : p == "b" ? 2 : 8),
                                !d || d == m ? t : c
                        );
                    })),
                    d && ((m = d), (b = b.replace(D, "$1").replace(re, "0.$1"))),
                    a != b)
                )
                    return new z(b, m);
                if (z.DEBUG)
                    throw Error(
                        bignumberError +
                        "Not a" +
                        (d ? " base " + d : "") +
                        " number: " +
                        a,
                    );
                n.s = null;
            }
            n.c = n.e = null;
        };
    })();
    function _e(Z, D, re, w) {
        var e,
            n,
            a,
            o,
            d,
            m,
            b,
            c = Z.c,
            t = POWS_TEN;
        if (c) {
            e: {
                for (e = 1, o = c[0]; o >= 10; o /= 10, e++);
                if (((n = D - e), n < 0))
                    (n += LOG_BASE),
                        (a = D),
                        (d = c[(m = 0)]),
                        (b = mathfloor((d / t[e - a - 1]) % 10));
                else if (((m = mathceil((n + 1) / LOG_BASE)), m >= c.length))
                    if (w) {
                        for (; c.length <= m; c.push(0));
                        (d = b = 0), (e = 1), (n %= LOG_BASE), (a = n - LOG_BASE + 1);
                    } else break e;
                else {
                    for (d = o = c[m], e = 1; o >= 10; o /= 10, e++);
                    (n %= LOG_BASE),
                        (a = n - LOG_BASE + e),
                        (b = a < 0 ? 0 : mathfloor((d / t[e - a - 1]) % 10));
                }
                if (
                    ((w =
                        w || D < 0 || c[m + 1] != null || (a < 0 ? d : d % t[e - a - 1])),
                        (w =
                            re < 4
                                ? (b || w) && (re == 0 || re == (Z.s < 0 ? 3 : 2))
                                : b > 5 ||
                                (b == 5 &&
                                    (re == 4 ||
                                        w ||
                                        (re == 6 &&
                                            (n > 0 ? (a > 0 ? d / t[e - a] : 0) : c[m - 1]) % 10 &
                                            1) ||
                                        re == (Z.s < 0 ? 8 : 7)))),
                    D < 1 || !c[0])
                )
                    return (
                        (c.length = 0),
                            w
                                ? ((D -= Z.e + 1),
                                    (c[0] = t[(LOG_BASE - (D % LOG_BASE)) % LOG_BASE]),
                                    (Z.e = -D || 0))
                                : (c[0] = Z.e = 0),
                            Z
                    );
                if (
                    (n == 0
                        ? ((c.length = m), (o = 1), m--)
                        : ((c.length = m + 1),
                            (o = t[LOG_BASE - n]),
                            (c[m] = a > 0 ? mathfloor((d / t[e - a]) % t[a]) * o : 0)),
                        w)
                )
                    for (;;)
                        if (m == 0) {
                            for (n = 1, a = c[0]; a >= 10; a /= 10, n++);
                            for (a = c[0] += o, o = 1; a >= 10; a /= 10, o++);
                            n != o && (Z.e++, c[0] == BASE && (c[0] = 1));
                            break;
                        } else {
                            if (((c[m] += o), c[m] != BASE)) break;
                            (c[m--] = 0), (o = 1);
                        }
                for (n = c.length; c[--n] === 0; c.pop());
            }
            Z.e > I ? (Z.c = Z.e = null) : Z.e < S && (Z.c = [(Z.e = 0)]);
        }
        return Z;
    }
    function je(Z) {
        var D,
            re = Z.e;
        return re === null
            ? Z.toString()
            : ((D = coeffToString(Z.c)),
                (D =
                    re <= A || re >= C ? toExponential(D, re) : toFixedPoint(D, re, "0")),
                Z.s < 0 ? "-" + D : D);
    }
    return (
        (M.absoluteValue = M.abs =
            function () {
                var Z = new z(this);
                return Z.s < 0 && (Z.s = 1), Z;
            }),
            (M.comparedTo = function (Z, D) {
                return compare(this, new z(Z, D));
            }),
            (M.decimalPlaces = M.dp =
                function (Z, D) {
                    var re,
                        w,
                        e,
                        n = this;
                    if (Z != null)
                        return (
                            intCheck(Z, 0, MAX),
                                D == null ? (D = $) : intCheck(D, 0, 8),
                                _e(new z(n), Z + n.e + 1, D)
                        );
                    if (!(re = n.c)) return null;
                    if (
                        ((w = ((e = re.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE),
                            (e = re[e]))
                    )
                        for (; e % 10 == 0; e /= 10, w--);
                    return w < 0 && (w = 0), w;
                }),
            (M.dividedBy = M.div =
                function (Z, D) {
                    return h(this, new z(Z, D), x, $);
                }),
            (M.dividedToIntegerBy = M.idiv =
                function (Z, D) {
                    return h(this, new z(Z, D), 0, 1);
                }),
            (M.exponentiatedBy = M.pow =
                function (Z, D) {
                    var re,
                        w,
                        e,
                        n,
                        a,
                        o,
                        d,
                        m,
                        b,
                        c = this;
                    if (((Z = new z(Z)), Z.c && !Z.isInteger()))
                        throw Error(bignumberError + "Exponent not an integer: " + je(Z));
                    if (
                        (D != null && (D = new z(D)),
                            (o = Z.e > 14),
                        !c.c ||
                        !c.c[0] ||
                        (c.c[0] == 1 && !c.e && c.c.length == 1) ||
                        !Z.c ||
                        !Z.c[0])
                    )
                        return (
                            (b = new z(Math.pow(+je(c), o ? Z.s * (2 - isOdd(Z)) : +je(Z)))),
                                D ? b.mod(D) : b
                        );
                    if (((d = Z.s < 0), D)) {
                        if (D.c ? !D.c[0] : !D.s) return new z(NaN);
                        (w = !d && c.isInteger() && D.isInteger()), w && (c = c.mod(D));
                    } else {
                        if (
                            Z.e > 9 &&
                            (c.e > 0 ||
                                c.e < -1 ||
                                (c.e == 0
                                    ? c.c[0] > 1 || (o && c.c[1] >= 24e7)
                                    : c.c[0] < 8e13 || (o && c.c[0] <= 9999975e7)))
                        )
                            return (
                                (n = c.s < 0 && isOdd(Z) ? -0 : 0),
                                c.e > -1 && (n = 1 / n),
                                    new z(d ? 1 / n : n)
                            );
                        X && (n = mathceil(X / LOG_BASE + 2));
                    }
                    for (
                        o
                            ? ((re = new z(0.5)), d && (Z.s = 1), (m = isOdd(Z)))
                            : ((e = Math.abs(+je(Z))), (m = e % 2)),
                            b = new z(l);
                        ;

                    ) {
                        if (m) {
                            if (((b = b.times(c)), !b.c)) break;
                            n ? b.c.length > n && (b.c.length = n) : w && (b = b.mod(D));
                        }
                        if (e) {
                            if (((e = mathfloor(e / 2)), e === 0)) break;
                            m = e % 2;
                        } else if (((Z = Z.times(re)), _e(Z, Z.e + 1, 1), Z.e > 14))
                            m = isOdd(Z);
                        else {
                            if (((e = +je(Z)), e === 0)) break;
                            m = e % 2;
                        }
                        (c = c.times(c)),
                            n ? c.c && c.c.length > n && (c.c.length = n) : w && (c = c.mod(D));
                    }
                    return w
                        ? b
                        : (d && (b = l.div(b)), D ? b.mod(D) : n ? _e(b, X, $, a) : b);
                }),
            (M.integerValue = function (Z) {
                var D = new z(this);
                return Z == null ? (Z = $) : intCheck(Z, 0, 8), _e(D, D.e + 1, Z);
            }),
            (M.isEqualTo = M.eq =
                function (Z, D) {
                    return compare(this, new z(Z, D)) === 0;
                }),
            (M.isFinite = function () {
                return !!this.c;
            }),
            (M.isGreaterThan = M.gt =
                function (Z, D) {
                    return compare(this, new z(Z, D)) > 0;
                }),
            (M.isGreaterThanOrEqualTo = M.gte =
                function (Z, D) {
                    return (D = compare(this, new z(Z, D))) === 1 || D === 0;
                }),
            (M.isInteger = function () {
                return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
            }),
            (M.isLessThan = M.lt =
                function (Z, D) {
                    return compare(this, new z(Z, D)) < 0;
                }),
            (M.isLessThanOrEqualTo = M.lte =
                function (Z, D) {
                    return (D = compare(this, new z(Z, D))) === -1 || D === 0;
                }),
            (M.isNaN = function () {
                return !this.s;
            }),
            (M.isNegative = function () {
                return this.s < 0;
            }),
            (M.isPositive = function () {
                return this.s > 0;
            }),
            (M.isZero = function () {
                return !!this.c && this.c[0] == 0;
            }),
            (M.minus = function (Z, D) {
                var re,
                    w,
                    e,
                    n,
                    a = this,
                    o = a.s;
                if (((Z = new z(Z, D)), (D = Z.s), !o || !D)) return new z(NaN);
                if (o != D) return (Z.s = -D), a.plus(Z);
                var d = a.e / LOG_BASE,
                    m = Z.e / LOG_BASE,
                    b = a.c,
                    c = Z.c;
                if (!d || !m) {
                    if (!b || !c) return b ? ((Z.s = -D), Z) : new z(c ? a : NaN);
                    if (!b[0] || !c[0])
                        return c[0] ? ((Z.s = -D), Z) : new z(b[0] ? a : $ == 3 ? -0 : 0);
                }
                if (
                    ((d = bitFloor(d)), (m = bitFloor(m)), (b = b.slice()), (o = d - m))
                ) {
                    for (
                        (n = o < 0) ? ((o = -o), (e = b)) : ((m = d), (e = c)),
                            e.reverse(),
                            D = o;
                        D--;
                        e.push(0)
                    );
                    e.reverse();
                } else
                    for (
                        w = (n = (o = b.length) < (D = c.length)) ? o : D, o = D = 0;
                        D < w;
                        D++
                    )
                        if (b[D] != c[D]) {
                            n = b[D] < c[D];
                            break;
                        }
                if (
                    (n && ((e = b), (b = c), (c = e), (Z.s = -Z.s)),
                        (D = (w = c.length) - (re = b.length)),
                    D > 0)
                )
                    for (; D--; b[re++] = 0);
                for (D = BASE - 1; w > o; ) {
                    if (b[--w] < c[w]) {
                        for (re = w; re && !b[--re]; b[re] = D);
                        --b[re], (b[w] += BASE);
                    }
                    b[w] -= c[w];
                }
                for (; b[0] == 0; b.splice(0, 1), --m);
                return b[0]
                    ? Ee(Z, b, m)
                    : ((Z.s = $ == 3 ? -1 : 1), (Z.c = [(Z.e = 0)]), Z);
            }),
            (M.modulo = M.mod =
                function (Z, D) {
                    var re,
                        w,
                        e = this;
                    return (
                        (Z = new z(Z, D)),
                            !e.c || !Z.s || (Z.c && !Z.c[0])
                                ? new z(NaN)
                                : !Z.c || (e.c && !e.c[0])
                                    ? new z(e)
                                    : (L == 9
                                        ? ((w = Z.s),
                                            (Z.s = 1),
                                            (re = h(e, Z, 0, 3)),
                                            (Z.s = w),
                                            (re.s *= w))
                                        : (re = h(e, Z, 0, L)),
                                        (Z = e.minus(re.times(Z))),
                                    !Z.c[0] && L == 1 && (Z.s = e.s),
                                        Z)
                    );
                }),
            (M.multipliedBy = M.times =
                function (Z, D) {
                    var re,
                        w,
                        e,
                        n,
                        a,
                        o,
                        d,
                        m,
                        b,
                        c,
                        t,
                        p,
                        _,
                        E,
                        k,
                        U = this,
                        F = U.c,
                        T = (Z = new z(Z, D)).c;
                    if (!F || !T || !F[0] || !T[0])
                        return (
                            !U.s || !Z.s || (F && !F[0] && !T) || (T && !T[0] && !F)
                                ? (Z.c = Z.e = Z.s = null)
                                : ((Z.s *= U.s),
                                    !F || !T ? (Z.c = Z.e = null) : ((Z.c = [0]), (Z.e = 0))),
                                Z
                        );
                    for (
                        w = bitFloor(U.e / LOG_BASE) + bitFloor(Z.e / LOG_BASE),
                            Z.s *= U.s,
                            d = F.length,
                            c = T.length,
                        d < c && ((_ = F), (F = T), (T = _), (e = d), (d = c), (c = e)),
                            e = d + c,
                            _ = [];
                        e--;
                        _.push(0)
                    );
                    for (E = BASE, k = SQRT_BASE, e = c; --e >= 0; ) {
                        for (
                            re = 0, t = T[e] % k, p = (T[e] / k) | 0, a = d, n = e + a;
                            n > e;

                        )
                            (m = F[--a] % k),
                                (b = (F[a] / k) | 0),
                                (o = p * m + b * t),
                                (m = t * m + (o % k) * k + _[n] + re),
                                (re = ((m / E) | 0) + ((o / k) | 0) + p * b),
                                (_[n--] = m % E);
                        _[n] = re;
                    }
                    return re ? ++w : _.splice(0, 1), Ee(Z, _, w);
                }),
            (M.negated = function () {
                var Z = new z(this);
                return (Z.s = -Z.s || null), Z;
            }),
            (M.plus = function (Z, D) {
                var re,
                    w = this,
                    e = w.s;
                if (((Z = new z(Z, D)), (D = Z.s), !e || !D)) return new z(NaN);
                if (e != D) return (Z.s = -D), w.minus(Z);
                var n = w.e / LOG_BASE,
                    a = Z.e / LOG_BASE,
                    o = w.c,
                    d = Z.c;
                if (!n || !a) {
                    if (!o || !d) return new z(e / 0);
                    if (!o[0] || !d[0]) return d[0] ? Z : new z(o[0] ? w : e * 0);
                }
                if (
                    ((n = bitFloor(n)), (a = bitFloor(a)), (o = o.slice()), (e = n - a))
                ) {
                    for (
                        e > 0 ? ((a = n), (re = d)) : ((e = -e), (re = o)), re.reverse();
                        e--;
                        re.push(0)
                    );
                    re.reverse();
                }
                for (
                    e = o.length,
                        D = d.length,
                    e - D < 0 && ((re = d), (d = o), (o = re), (D = e)),
                        e = 0;
                    D;

                )
                    (e = ((o[--D] = o[D] + d[D] + e) / BASE) | 0),
                        (o[D] = BASE === o[D] ? 0 : o[D] % BASE);
                return e && ((o = [e].concat(o)), ++a), Ee(Z, o, a);
            }),
            (M.precision = M.sd =
                function (Z, D) {
                    var re,
                        w,
                        e,
                        n = this;
                    if (Z != null && Z !== !!Z)
                        return (
                            intCheck(Z, 1, MAX),
                                D == null ? (D = $) : intCheck(D, 0, 8),
                                _e(new z(n), Z, D)
                        );
                    if (!(re = n.c)) return null;
                    if (((e = re.length - 1), (w = e * LOG_BASE + 1), (e = re[e]))) {
                        for (; e % 10 == 0; e /= 10, w--);
                        for (e = re[0]; e >= 10; e /= 10, w++);
                    }
                    return Z && n.e + 1 > w && (w = n.e + 1), w;
                }),
            (M.shiftedBy = function (Z) {
                return (
                    intCheck(Z, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER), this.times("1e" + Z)
                );
            }),
            (M.squareRoot = M.sqrt =
                function () {
                    var Z,
                        D,
                        re,
                        w,
                        e,
                        n = this,
                        a = n.c,
                        o = n.s,
                        d = n.e,
                        m = x + 4,
                        b = new z("0.5");
                    if (o !== 1 || !a || !a[0])
                        return new z(!o || (o < 0 && (!a || a[0])) ? NaN : a ? n : 1 / 0);
                    if (
                        ((o = Math.sqrt(+je(n))),
                            o == 0 || o == 1 / 0
                                ? ((D = coeffToString(a)),
                                (D.length + d) % 2 == 0 && (D += "0"),
                                    (o = Math.sqrt(+D)),
                                    (d = bitFloor((d + 1) / 2) - (d < 0 || d % 2)),
                                    o == 1 / 0
                                        ? (D = "5e" + d)
                                        : ((D = o.toExponential()),
                                            (D = D.slice(0, D.indexOf("e") + 1) + d)),
                                    (re = new z(D)))
                                : (re = new z(o + "")),
                            re.c[0])
                    ) {
                        for (d = re.e, o = d + m, o < 3 && (o = 0); ; )
                            if (
                                ((e = re),
                                    (re = b.times(e.plus(h(n, e, m, 1)))),
                                coeffToString(e.c).slice(0, o) ===
                                (D = coeffToString(re.c)).slice(0, o))
                            )
                                if (
                                    (re.e < d && --o,
                                        (D = D.slice(o - 3, o + 1)),
                                    D == "9999" || (!w && D == "4999"))
                                ) {
                                    if (!w && (_e(e, e.e + x + 2, 0), e.times(e).eq(n))) {
                                        re = e;
                                        break;
                                    }
                                    (m += 4), (o += 4), (w = 1);
                                } else {
                                    (!+D || (!+D.slice(1) && D.charAt(0) == "5")) &&
                                    (_e(re, re.e + x + 2, 1), (Z = !re.times(re).eq(n)));
                                    break;
                                }
                    }
                    return _e(re, re.e + x + 1, $, Z);
                }),
            (M.toExponential = function (Z, D) {
                return Z != null && (intCheck(Z, 0, MAX), Z++), ce(this, Z, D, 1);
            }),
            (M.toFixed = function (Z, D) {
                return (
                    Z != null && (intCheck(Z, 0, MAX), (Z = Z + this.e + 1)), ce(this, Z, D)
                );
            }),
            (M.toFormat = function (Z, D, re) {
                var w,
                    e = this;
                if (re == null)
                    Z != null && D && typeof D == "object"
                        ? ((re = D), (D = null))
                        : Z && typeof Z == "object"
                            ? ((re = Z), (Z = D = null))
                            : (re = Q);
                else if (typeof re != "object")
                    throw Error(bignumberError + "Argument not an object: " + re);
                if (((w = e.toFixed(Z, D)), e.c)) {
                    var n,
                        a = w.split("."),
                        o = +re.groupSize,
                        d = +re.secondaryGroupSize,
                        m = re.groupSeparator || "",
                        b = a[0],
                        c = a[1],
                        t = e.s < 0,
                        p = t ? b.slice(1) : b,
                        _ = p.length;
                    if ((d && ((n = o), (o = d), (d = n), (_ -= n)), o > 0 && _ > 0)) {
                        for (n = _ % o || o, b = p.substr(0, n); n < _; n += o)
                            b += m + p.substr(n, o);
                        d > 0 && (b += m + p.slice(n)), t && (b = "-" + b);
                    }
                    w = c
                        ? b +
                        (re.decimalSeparator || "") +
                        ((d = +re.fractionGroupSize)
                            ? c.replace(
                                new RegExp("\\d{" + d + "}\\B", "g"),
                                "$&" + (re.fractionGroupSeparator || ""),
                            )
                            : c)
                        : b;
                }
                return (re.prefix || "") + w + (re.suffix || "");
            }),
            (M.toFraction = function (Z) {
                var D,
                    re,
                    w,
                    e,
                    n,
                    a,
                    o,
                    d,
                    m,
                    b,
                    c,
                    t,
                    p = this,
                    _ = p.c;
                if (
                    Z != null &&
                    ((o = new z(Z)), (!o.isInteger() && (o.c || o.s !== 1)) || o.lt(l))
                )
                    throw Error(
                        bignumberError +
                        "Argument " +
                        (o.isInteger() ? "out of range: " : "not an integer: ") +
                        je(o),
                    );
                if (!_) return new z(p);
                for (
                    D = new z(l),
                        m = re = new z(l),
                        w = d = new z(l),
                        t = coeffToString(_),
                        n = D.e = t.length - p.e - 1,
                        D.c[0] = POWS_TEN[(a = n % LOG_BASE) < 0 ? LOG_BASE + a : a],
                        Z = !Z || o.comparedTo(D) > 0 ? (n > 0 ? D : m) : o,
                        a = I,
                        I = 1 / 0,
                        o = new z(t),
                        d.c[0] = 0;
                    (b = h(o, D, 0, 1)), (e = re.plus(b.times(w))), e.comparedTo(Z) != 1;

                )
                    (re = w),
                        (w = e),
                        (m = d.plus(b.times((e = m)))),
                        (d = e),
                        (D = o.minus(b.times((e = D)))),
                        (o = e);
                return (
                    (e = h(Z.minus(re), w, 0, 1)),
                        (d = d.plus(e.times(m))),
                        (re = re.plus(e.times(w))),
                        (d.s = m.s = p.s),
                        (n = n * 2),
                        (c =
                            h(m, w, n, $)
                                .minus(p)
                                .abs()
                                .comparedTo(h(d, re, n, $).minus(p).abs()) < 1
                                ? [m, w]
                                : [d, re]),
                        (I = a),
                        c
                );
            }),
            (M.toNumber = function () {
                return +je(this);
            }),
            (M.toPrecision = function (Z, D) {
                return Z != null && intCheck(Z, 1, MAX), ce(this, Z, D, 2);
            }),
            (M.toString = function (Z) {
                var D,
                    re = this,
                    w = re.s,
                    e = re.e;
                return (
                    e === null
                        ? w
                            ? ((D = "Infinity"), w < 0 && (D = "-" + D))
                            : (D = "NaN")
                        : (Z == null
                            ? (D =
                                e <= A || e >= C
                                    ? toExponential(coeffToString(re.c), e)
                                    : toFixedPoint(coeffToString(re.c), e, "0"))
                            : Z === 10 && ne
                                ? ((re = _e(new z(re), x + e + 1, $)),
                                    (D = toFixedPoint(coeffToString(re.c), re.e, "0")))
                                : (intCheck(Z, 2, ae.length, "Base"),
                                    (D = y(
                                        toFixedPoint(coeffToString(re.c), e, "0"),
                                        10,
                                        Z,
                                        w,
                                        !0,
                                    ))),
                        w < 0 && re.c[0] && (D = "-" + D)),
                        D
                );
            }),
            (M.valueOf = M.toJSON =
                function () {
                    return je(this);
                }),
            (M._isBigNumber = !0),
            (M[Symbol.toStringTag] = "BigNumber"),
            (M[Symbol.for("nodejs.util.inspect.custom")] = M.valueOf),
        u != null && z.set(u),
            z
    );
}

var BigNumber = clone();
export {
    BigNumber as b
};