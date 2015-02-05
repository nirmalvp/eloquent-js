function rowHeights(rows) {
    return rows.map(function(row) {
        return row.reduce(function(max, cell) {
            return Math.max(max, cell.minHeight())
        }, 0);
    });
}

function columnWidths(rows) {
    return rows[0].map(function(_, i) {
        return rows.reduce(function(max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = columnWidths(rows);

    function drawLine(blocks, lineNum) {
        return blocks.map(function(block) {
            return block[lineNum];
        }).join(" ");
    }

    function drawRows(row, rowNum) {
        var blocks = row.map(function(cell, columnNo) {
            return cell.draw(widths[columnNo], heights[rowNum]);
        });
        return blocks[0].map(function(_, lineNum) {
            return drawLine(blocks, lineNum);
        }).join("\n");
    }

    return rows.map(drawRows).join("\n");
}

function TextCell(text) {
    this.text = text.split("\n");
}

TextCell.prototype.minHeight = function() {
    return this.text.length;
}

TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(max, lineInCell) {
        return Math.max(max, lineInCell.length);
    }, 0);
};

function pad(textStr, times) {
    var padString = "";
    for (i = 0; i < times; i++) {
        padString += textStr;
    }
    return padString
}

TextCell.prototype.draw = function(width, height) {
    var result = []
    for (i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(line + pad(" ", width - line.length));
    }
    return result;
}

var rows = [];
for (var i = 0; i < 5; i++) {
    var row = [];
    for (var j = 0; j < 5; j++) {
        if ((j + i) % 2 == 0)
            row.push(new TextCell("##"));
        else
            row.push(new TextCell("  "));
    }
    rows.push(row);
}
console.log(drawTable(rows));