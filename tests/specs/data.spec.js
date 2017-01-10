define( function(){

  return {
        spec: function(data){

        describe("Data Tests", function() {

          it("Units can only be int or euro", function() {
            expect(data.impressions.units).toBe('int');
            expect(data.visits.units).toBe('int');
            expect(data.revenue.units).toBe('euro');
          });

          it("Smartphone and Tablet values cannot be NULL", function() {
            expect(data.impressions.smartphone).not.toBe(null);
            expect(data.visits.smartphone).not.toBe(null);
            expect(data.revenue.smartphone).not.toBe(null);
            expect(data.impressions.tablet).not.toBe(null);
            expect(data.visits.tablet).not.toBe(null);
            expect(data.revenue.tablet).not.toBe(null);
          });

        });

  }
}

});
