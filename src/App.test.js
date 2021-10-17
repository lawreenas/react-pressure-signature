const App = require("./App")

// @ponicode
describe("save", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Edmond", "Pierre Edouard", "Pierre Edouard"], ["Pierre Edouard", "Pierre Edouard", "Edmond"], ["Pierre Edouard", "George", "Jean-Philippe"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.save()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("export", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Jean-Philippe", "Michael", "George"], ["Pierre Edouard", "Pierre Edouard", "Michael"], ["Anas", "George", "George"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.export()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("addPoint", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Michael", "Edmond", "Pierre Edouard"], ["Edmond", "Michael", "Michael"], ["Michael", "Jean-Philippe", "George"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.addPoint("hsl(10%,20%,40%)")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.addPoint("#FF00FF")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.addPoint("green")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.addPoint("red")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.addPoint("#F00")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.addPoint(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
