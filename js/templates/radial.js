define( function() {

  return {
        create: function(data){

    var _data=null,
        _duration= 1000,
        _selection,
        _margin = {top:0, right:0, bottom:30, left:0},
        __width = 350,
        __height = 350,
        _diameter = 300,
        _label="",
        _color="",
        _secondcolor="",
        _tablet="",
        _smartphone="",
        _unit="",
        _fontSize=10;


    var _value= 0,
        _minValue = 0,
        _maxValue = 100;

    var  _currentArc= 0, _currentValue=0;

    var _arc = d3.svg.arc()
        .startAngle(0 * (Math.PI/180)); //just radians


    _selection=d3.select(data);


    function component() {

        _selection.each(function (data) {

            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);

            var enter = svg.enter().append("svg").attr("class","radial-svg").append("g");

            measure();

            svg.attr("width", __width)
                .attr("height", __height)
                .style("border-bottom", "1px solid #e5e5e5");


            var background = enter.append("g").attr("class","component")
                    .attr("fill", _color);


            _arc.endAngle(360 * (Math.PI/180))

            background.append("rect")
                .attr("class","background")
                .attr("width", _width)
                .attr("height", _height);

            background.append("path")
                .attr("transform", "translate(" + _width/1.5 + "," + _width/2 + ")")
                .attr("d", _arc)
                .style("text-align", "center");

            //Tablet Texts

            background.append("text")
                .attr("class", "device")
                .attr("fill", _color)
                .attr("transform", "translate(" + 25 + "," + (_width + _fontSize) + ")")
                .text("Tablet");

            background.append("text")
                .attr("class", "label")
                .attr("font-weight", "bolder")
                .attr("transform", "translate(" + 25 + "," + (_width+30 + _fontSize) + ")")
                .text(100-(((_smartphone-_minValue)/(_maxValue-_minValue)))*100 + "%");

            background.append("text")
                .attr("class", "label")
                .attr("transform", "translate(" + 85 + "," + (_width+30 + _fontSize) + ")")
                .text(_tablet + (_unit == "euro" ? "€" : ""));

            //Smartphone Texts

            background.append("text")
                .attr("class", "device")
                .attr("fill", _secondcolor)
                .attr("transform", "translate(" + (_width+30) + "," + (_width + _fontSize) + ")")
                .text("Smartphone");

            background.append("text")
                .attr("class", "label")
                .attr("font-weight", "bolder")
                .attr("transform", "translate(" + (_width+60) + "," + (_width+30 + _fontSize) + ")")
                .text(((_smartphone-_minValue)/(_maxValue-_minValue))*100 + "%");

            background.append("text")
                .attr("class", "label")
                .attr("transform", "translate(" + _width + "," + (_width+30 + _fontSize) + ")")
                .text(_smartphone + (_unit == "euro" ? "€" : ""));


            _arc.endAngle(_currentArc);
            enter.append("g").attr("class", "arcs");
            var path = svg.select(".arcs").selectAll(".arc").data(data);
            path.enter().append("path")
                .attr("fill", _secondcolor)
                .attr("transform", "translate(" + _width/1.5 + "," + _width/2 + ")")
                .attr("d", _arc);


            enter.append("g").attr("class", "labels");
            var label = svg.select(".labels").selectAll(".label").data(data);
            label.enter().append("text")
                .attr("class","label")
                .attr("y",_width/2.5+_fontSize/3)
                .attr("x",_width/1.5)
                .attr("width",_width)
                .attr("fill", "#a0a0a0")
                .text(_label)
                .style("font-size",_fontSize/1.5+"px");
            label.enter().append("text")
                .attr("class","label")
                .attr("y",_width/2+_fontSize/3)
                .attr("x",_width/1.5)
                .attr("width",_width)
                //.text(function (d) { return Math.round((_value-_minValue)/(_maxValue-_minValue)*100) + "%" })
                .style("font-size",_fontSize+"px");

            path.exit().transition().duration(500).attr("x",1000).remove();


            layout(svg);

            function layout(svg) {

                var ratio=(_smartphone-_minValue)/(_maxValue-_minValue);
                var endAngle=Math.min(360*ratio,360);
                endAngle=endAngle * Math.PI/180;

                path.datum(endAngle);
                path.transition().duration(_duration)
                    .attrTween("d", arcTween);

                label.datum(Math.round(_maxValue));
                label.transition().duration(_duration)
                    .tween("text",labelTween);

            }

        });
    }

    function labelTween(a) {
        var i = d3.interpolate(_currentValue, a);
        _currentValue = i(0);

        return function(t) {
            _currentValue = i(t);
            this.textContent = Math.round(i(t)) + (_unit == "euro" ? "€" : "");
        }
    }

    function arcTween(a) {
        var i = d3.interpolate(_currentArc, a);

        return function(t) {
            _currentArc=i(t);
            return _arc.endAngle(i(t))();
        };
    }

    function measure() {
        _width=_diameter - _margin.right - _margin.left - _margin.top - _margin.bottom;
        _height=_width;
        _fontSize=_width*.1;
        _arc.outerRadius(_width/2);
        _arc.innerRadius(_width/2 * .85);
    }


    component.render = function() {
        measure();
        component();
        return component;
    }

    component.value = function (_) {
        if (!arguments.length) return _value;
        _value = [_];
        _selection.datum([_value]);
        return component;
    }

    component.margin = function(_) {
        if (!arguments.length) return _margin;
        _margin = _;
        return component;
    };

    component.diameter = function(_) {
        if (!arguments.length) return _diameter
        _diameter =  _;
        return component;
    };

    component.minValue = function(_) {
        if (!arguments.length) return _minValue;
        _minValue = _;
        return component;
    };

    component.maxValue = function(_) {
        if (!arguments.length) return _maxValue;
        _maxValue = _;
        return component;
    };

    component.color = function(_) {
        if (!arguments.length) return _color;
        _color = _;
        return component;
    };

    component.secondcolor = function(_) {
        if (!arguments.length) return _secondcolor;
        _secondcolor = _;
        return component;
    };

    component.tablet = function(_) {
        if (!arguments.length) return _tablet;
        _tablet = _;
        return component;
    };

    component.smartphone = function (_) {
        if (!arguments.length) return _smartphone;
        _smartphone = [_];
        _selection.datum([_smartphone]);
        return component;
    }

    component.unit = function(_) {
        if (!arguments.length) return _unit;
        _unit = _;
        return component;
    };

    component.label = function(_) {
        if (!arguments.length) return _label;
        _label = _;
        return component;
    };

    component._duration = function(_) {
        if (!arguments.length) return _duration;
        _duration = _;
        return component;
    };

    return component;

  }
}

});
