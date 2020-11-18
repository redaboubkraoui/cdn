!async function() {
    if (null === document.querySelector('form[action="/cart/add"] button') && null === document.querySelector("#trust-pitcher-app")) return;
    const t = [14, 21],
        e = {
            isEnabled: !1,
            locale: "auto",
            dateStyle: "medium",
            includeYear: !1
        },
        n = [{
            id: "4e44c8bd-3d36-47d3-a3f0-762dbf0d45ba",
            name: "U.S.A",
            countries: ["US"],
            delivery_duration: [7, 12]
        }, {
            id: "39219bed-ca3b-4f81-9b28-48d3f9d280f1",
            name: "Rest of World",
            countries: ["restofworld"],
            delivery_duration: [21, 30]
        }],
        c = [{
            id: "talnsgai9023k",
            icon: {
                tag: "truck-5",
                type: "flaticon"
            },
            text: "This item ships to $(city), $(country)."
        }, {
            id: "kansga0932r234",
            icon: {
                tag: "priority",
                type: "flaticon"
            },
            text: "Get it by $(date)."
        }],
        a = ["cc-paypal", "cc-mastercard", "cc-visa", "cc-amex", "cc-stripe"];
    let o, r, s; {
        const t = await fetch("https://get.geojs.io/v1/ip/geo.json"),
            e = await t.json();
        o = e.city ? e.city : "your location", r = e.country ? e.country : "", s = e.country_code ? e.country_code : ""
    }
    const i = c => {
            let a;
            a = (a = c.replace("$(city)", `<span>${o}</span>`)).replace("$(country)", `<span>${r}</span>`);
            const i = function(t, e, n) {
                const c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    a = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    o = function(t) {
                        if (t > 3 && t < 21) return "th";
                        switch (t % 10) {
                            case 1:
                                return "st";
                            case 2:
                                return "nd";
                            case 3:
                                return "rd";
                            default:
                                return "th"
                        }
                    },
                    r = new Date;
                if (Array.isArray(t)) {
                    const s = w(r, t[0], e),
                        i = w(r, t[1], e);
                    if (n.isEnabled && n.locale) {
                        const t = v(s, n),
                            e = v(i, n);
                        return t + " - " + e
                    }
                    const d = a[s.getDay()],
                        u = a[i.getDay()],
                        l = s.getDate(),
                        p = i.getDate(),
                        m = c[s.getMonth()],
                        f = c[i.getMonth()],
                        y = d + ", " + m + " " + l + o(l),
                        h = u + ", " + f + " " + p + o(p);
                    return y + " - " + h
                } {
                    const s = w(r, t, e);
                    if (n.isEnabled && n.locale) return v(s, n);
                    const i = a[s.getDay()],
                        d = s.getDate(),
                        u = c[s.getMonth()],
                        l = i + ", " + u + " " + d + o(d);
                    return l
                }
            }(function() {
                const e = [],
                    c = [];
                for (let t = 0; t < n.length; t++) {
                    const a = n[t].countries.filter(t => t === s),
                        o = n[t].countries.filter(t => "restofworld" === t);
                    a.length > 0 && e.push(t), o.length > 0 && c.push(t)
                }
                return e.length > 0 ? n[e[0]].delivery_duration : c.length > 0 ? n[c[0]].delivery_duration : t
            }(), !1, e);
            return a = a.replace("$(date)", `<span>${i}</span>`)
        },
        d = c.find(t => "fa" === t.icon.type) || !0,
        u = document.getElementsByTagName("head")[0],
        l = document.createElement("div");
    l.id = "trustpitcher-app-container";
    const p = document.createElement("div");
    p.classList.add("trustpitcher-trustbadges-container");
    const m = document.createElement("div");
    m.classList.add("trustpitcher-trustbadges-trusttext-container");
    const f = document.createElement("p");
    f.classList.add("trustpitcher-trustbadges-trusttext"), f.textContent = "We accept", m.append(f);
    const y = document.createElement("div");
    y.classList.add("trustpitcher-trustbadges-badges-container");
    for (const t of a) {
        const e = document.createElement("i");
        e.classList.add("fa", `fa-${t}`, "fa-fw"), y.append(e)
    }
    p.append(m), p.append(y);
    const h = document.createElement("div");
    h.classList.add("trustpitcher-pitchbox-container");
    for (const t of c) {
        const e = document.createElement("div");
        if (e.classList.add("trustpitcher-pitchbox-box"), "flaticon" === t.icon.type) {
            const n = document.createElement("img");
            n.height = 46, n.width = 46, n.src = `https://cdn.trustpitcher.com/assets/svg_icons/${t.icon.tag}.svg`, e.append(n)
        } else {
            const n = document.createElement("i");
            n.height = 46, n.width = 46, n.classList.add("fa", `fa-${t.icon.tag}`, "fa-fw"), e.append(n)
        }
        const n = document.createElement("p");
        n.innerHTML = i(t.text), e.append(n), h.append(e)
    }
    l.append(h), l.append(p);
    const g = document.querySelector("#trust-pitcher-app");
    let b = !1,
        D = !1;

    function w(t, e, n) {
        const c = new Date(Number(t));
        let a = new Date(Number(t));
        if (n) {
            let t = 0;
            for (; t < e;) 0 != (a = new Date(c.setDate(c.getDate() + 1))).getDay() && 6 != a.getDay() && t++;
            return a
        }
        return a = new Date(c.setDate(c.getDate() + e))
    }

    function v(t, e) {
        const {
            locale: n,
            dateStyle: c,
            includeYear: a
        } = e, o = new Intl.DateTimeFormat(function(t) {
            if ("auto" === t) return;
            let e;
            try {
                e = Intl.DateTimeFormat.supportedLocalesOf([t])
            } catch (t) {
                e = void 0
            }
            return e
        }(n), {
            dateStyle: c
        }).formatToParts(t);
        if (!a) {
            const t = o.findIndex(t => "year" === t.type);
            o.splice(t, 1), o[t - 1] && "literal" === o[t - 1].type && o.splice(t - 1, 1)
        }
        return o.map(t => t.value).join("")
    }(async () => {
        await (async () => new Promise(t => {
            if (d) {
                const e = document.createElement("link");
                e.rel = "stylesheet", e.href = "https://cdn.trustpitcher.com/assets/font-awesome/css/font-awesome.min.css", e.crossOrigin = "anonymous", e.onload = function() {
                    D = !0, b && t()
                }, u.append(e)
            }
            const e = document.createElement("link");
            e.rel = "stylesheet", e.href = "https://cdn.trustpitcher.com/embed/dohashopiy.myshopify.com/97e83d58-4f79-42bf-87d9-2954f0d3bbf5.css", e.type = "text/css", e.crossOrigin = "anonymous", e.onload = function() {
                b = !0, d && !D || t()
            }, u.append(e)
        }))(), null !== g ? g.append(l) : document.querySelector('form[action="/cart/add"]').after(l), fetch(1).catch(t => console.log(t))
    })()
}();
