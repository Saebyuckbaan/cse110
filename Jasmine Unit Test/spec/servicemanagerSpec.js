
describe("addServices() ", function() {
    it("Add Service to current User", function() {
        expect(addServices()).toEqual(true);
    });
});


describe("removeService() ", function() {
    it("Remove existing service from Current user", function() {
        expect(removeService()).toEqual(true);
    });
});


describe("addServices() ", function() {
    it("Add Service to specific User", function() {
        expect(addServices()).toEqual(true);
    });
});


describe("removeService() ", function() {
    it("Remove existing service from specific user", function() {
        expect(removeService()).toEqual(true);
    });
});

describe("cancelServices() ", function() {
    it("Cancel existing user's services", function() {
        expect(cancelServices()).toEqual(true);
    });
});
