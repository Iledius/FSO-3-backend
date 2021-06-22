(this.webpackJsonppuhelinluettelo =
  this.webpackJsonppuhelinluettelo || []).push([
  [0],
  {
    15: function (e, n, t) {
      e.exports = t(39);
    },
    20: function (e, n, t) {},
    39: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = t(0),
        r = t.n(a),
        u = t(14),
        c = t.n(u),
        l = (t(20), t(4)),
        o = t(3),
        i = function (e) {
          var n = e.filterName,
            t = e.setFilterName;
          return r.a.createElement(
            "div",
            null,
            "filter shown with",
            " ",
            r.a.createElement("input", {
              value: n,
              onChange: function (e) {
                t(e.target.value);
              },
            })
          );
        },
        m = function (e) {
          var n = e.person,
            t = e.removePerson;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              null,
              n.name,
              " ",
              n.number,
              r.a.createElement("button", { onClick: t }, "delete")
            )
          );
        },
        d = function (e) {
          var n = e.addPerson,
            t = e.newName,
            a = e.handleNameChange,
            u = e.newNumber,
            c = e.handleNumberChange;
          return r.a.createElement(
            "form",
            { onSubmit: n },
            r.a.createElement(
              "div",
              null,
              r.a.createElement("h2", null, "add a new"),
              "name: ",
              r.a.createElement("input", { value: t, onChange: a })
            ),
            r.a.createElement(
              "div",
              null,
              "number: ",
              r.a.createElement("input", { value: u, onChange: c })
            ),
            r.a.createElement(
              "div",
              null,
              r.a.createElement("button", { type: "submit" }, "add")
            )
          );
        },
        f = t(2),
        h = t.n(f),
        s = "/api/persons",
        b = function () {
          return h.a.get(s).then(function (e) {
            return e.data;
          });
        },
        v = function (e) {
          return h.a.post(s, e).then(function (e) {
            return e.data;
          });
        },
        p = function (e, n) {
          return h.a.put("".concat(s, "/").concat(e), n).then(function (e) {
            return e.data;
          });
        },
        E = function (e) {
          return (
            console.log(e),
            h.a.delete("".concat(s, "/").concat(e)).then(function (e) {
              return e.data;
            })
          );
        },
        g = function () {
          var e = Object(a.useState)([]),
            n = Object(o.a)(e, 2),
            t = n[0],
            u = n[1],
            c = Object(a.useState)(""),
            f = Object(o.a)(c, 2),
            h = f[0],
            s = f[1],
            g = Object(a.useState)(""),
            w = Object(o.a)(g, 2),
            N = w[0],
            j = w[1],
            O = Object(a.useState)(""),
            C = Object(o.a)(O, 2),
            k = C[0],
            S = C[1];
          Object(a.useEffect)(function () {
            b().then(function (e) {
              u(e);
            });
          }, []);
          var P = t.filter(function (e) {
            return e.name.includes(k);
          });
          return r.a.createElement(
            "div",
            null,
            r.a.createElement("h2", null, "Phonebook"),
            r.a.createElement(i, { filterName: k, setFilterName: S }),
            r.a.createElement(d, {
              addPerson: function (e) {
                e.preventDefault();
                var n = { name: h, number: N },
                  a = t.filter(function (e) {
                    return e.name === h;
                  });
                if (a.length) {
                  if (
                    window.confirm(
                      "".concat(
                        h,
                        " is already added to phonebook, replace the old number with a new one?"
                      )
                    )
                  ) {
                    var r = a[0],
                      c = Object(l.a)(Object(l.a)({}, r), {}, { number: N });
                    p(r.id, c).then(function (e) {
                      u(
                        t.map(function (n) {
                          return n.id !== r.id ? n : e;
                        })
                      );
                    });
                  }
                } else
                  v(n).then(function (e) {
                    u(t.concat(e));
                  });
                s(""), j("");
              },
              newName: h,
              handleNameChange: function (e) {
                return s(e.target.value);
              },
              newNumber: N,
              handleNumberChange: function (e) {
                return j(e.target.value);
              },
            }),
            r.a.createElement("h2", null, "Numbers"),
            P.map(function (e) {
              return r.a.createElement(m, {
                key: e.id,
                person: e,
                removePerson: function () {
                  return (
                    (n = e.id),
                    void E(n).then(function (e) {
                      u(t),
                        b().then(function (e) {
                          u(e);
                        });
                    })
                  );
                  var n;
                },
              });
            })
          );
        };
      c.a.render(
        r.a.createElement(r.a.StrictMode, null, r.a.createElement(g, null)),
        document.getElementById("root")
      );
    },
  },
  [[15, 1, 2]],
]);
//# sourceMappingURL=main.3d9ceee8.chunk.js.map
