require.config({

  paths: {
    d3: "https://d3js.org/d3.v3.min",
    radial: "templates/radial",
    data: "data/data"
  },

  shim: {
    radial: {
      deps: ['d3.global'],
      exports: 'radial'
    }
  }

});

define("d3.global", ["d3"], function(_) {
      d3 = _;
});

require(["d3", "radial", "data"], function(d3, radial, data) {

  for(var model in data) {

    d3.select("#app").append("div").attr("id", data[model].div);

    var total = data[model].smartphone + data[model].tablet;

    radial.create(document.getElementById(data[model].div))
                  .label(data[model].label)
                  .maxValue(total)
                  .color(data[model].color)
                  .secondcolor(data[model].secondcolor)
                  .unit(data[model].units)
                  .tablet(data[model].tablet)
                  .smartphone(data[model].smartphone)
                  .render();

  }

});
