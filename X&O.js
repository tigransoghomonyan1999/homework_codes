$(document).ready(function() {
        $(".X, .O").css("z-index", "2000");
        $(".X, .O").draggable({
            helper: "clone"
        });
        $(".clickBox").droppable({
            accept: ".X, .O",
            drop: function(event, dragObj) {
                let droppable = this;
                let draggable = dragObj.draggable;
                if(this.hasChildNodes()) {
                    return;
                }
                // Move draggable into droppable
                draggable.clone().appendTo(droppable);
                if(draggable.attr("id") == "x") {
                    event.target.value = 1;
                    $("#x").draggable("disable");
                    $("#o").draggable("enable");
                } else {
                    event.target.value = 0;
                    $("#o").draggable("disable");
                    $("#x").draggable("enable");
                }
                for (let i = 0; i < 3; i++) {
                    for(let j = 0; j < 3; j++) {
                    mtrxOfvals[i][j] = mtrx[i][j].value;
                    }
                }
                checkMatrix(mtrxOfvals);
            }
        });
    // Non Drag'n'Droppable case code starts from here
    let changer = 1;
    let X = $(".X");
    let O = $(".O");
    let arrOfCells = Array.from($(".gameTable").children());;
    let mtrx = [
            arrOfCells.splice(0, 3),
            arrOfCells.splice(0, 3),
            arrOfCells.splice(0, 3)
        ];
    let mtrxOfvals = [
        new Array(3),
        new Array(3),
        new Array(3)
    ];
    for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
        mtrxOfvals[i][j] = mtrx[i][j].value;
        }
    }
    $(".clickBox").click(function(event) {
        if(this.hasChildNodes()) {
            return;
        }
        if(changer == 1) {
            let x = X.clone()
            x.appendTo(this);
            this.value = 1;
            changer = 0;
        } else {
            o = O.clone();
            o.appendTo(this);
            this.value = 0;
            changer = 1;
        }
        for (let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
            mtrxOfvals[i][j] = mtrx[i][j].value;
            }
        }
        checkMatrix(mtrxOfvals)
    })
    $("button").click(function() {
        $(".clickBox").children().remove();
        for(let i = 0; i < 3; i++) {
            mtrxOfvals[i] = mtrxOfvals[i].map(function(item) {
                item = -1;
                //alert(item);
                return item;
            });
            for (let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                mtrx[i][j].value = -1;
                }
            }
        }
        changer = 1; // because in initial click I want "X" to appear
    })
    function checkMatrix(matrix) {
        function checkRow() {
            for(let i = 0; i < 3; i++) {
                if(matrix[i][0] == 0 && matrix[i][1] == 0 && matrix[i][2] == 0 || matrix[i][0] == 1 && matrix[i][1] == 1 && matrix[i][2] == 1) {
                    if (matrix[i][0] == 1) {
                        Ends("X is the Winner!");
                        return true;
                    } else {
                        Ends("O is the Winner!");
                        return true;
                    }
                }
            }
            return false;
        }
        function checkCol() {
            for(let i = 0; i < 3; i++) {
                if(matrix[0][i] == 0 && matrix[1][i] == 0 && matrix[2][i] == 0 || matrix[0][i] == 1 && matrix[1][i] == 1 && matrix[2][i] == 1) {
                    if (matrix[0][i] == 1) {
                        Ends("X is the Winner!");
                        return true;
                    } else {
                        Ends("O is the Winner!");
                        return true;
                    }
                }
            }
            return false;
        }
        function checkAngle() {
            let x = 0;
            let o = 0;
            for(let i = 0; i < 3; i++){
                if(matrix[i][i] == 0) {
                    o++
                } else if (matrix[i][i] == 1) {
                    x++
                }
            }
            if (o == 3) {
                Ends("O is the Winner!");
            } else if (x == 3) {
                Ends("X is the Winner!");
            }
            if(matrix[0][2] == 0 && matrix[1][1] == 0 && matrix[2][0] == 0 || matrix[0][2] == 1 && matrix[1][1] == 1 && matrix[2][0] == 1) {
                if(matrix[1][1] == 0) {
                    Ends("O is the Winner!");
                    return true;
                } else if (matrix[1][1] == 1) {
                    Ends("X is the Winner!");
                    return true;
                }
            }
            return false;
        }
        checkAngle();
        checkCol();
        checkRow();
        let count = 0;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(matrix[i][j] == 1 || matrix[i][j] == 0) {
                    count++;
                }
            }
        }
        if(count == 3*3 && !checkAngle() && !checkRow() && !checkCol()) {
            Ends("It is draw!!");
        }
    }
    function Ends(text) {
        new Promise(resolve => setTimeout(resolve, 300))
        .then(res => {
                let gameTable = document.getElementsByClassName('gameTable')[0];
                gameTable.style.display = "none";
                let div = document.getElementsByClassName('header')[0];
                div.style.display = "none";
                let Tie = document.createElement('div');
                Tie.style.cssText = `
                width: 100%;
                height: 600px;
                position: relative;
                text-align: center;
                font-size: 150px;
                color: brown;
                background-color: coral;
                `;
                Tie.innerHTML = `${text}`
                let button = document.createElement('a');
                button.href = "http://localhost/test/X%26O.html";
                button.innerHTML = "Try again";
                button.style.cssText = `
                font-size: 50px;
                border: 1px solid black;
                background-color: white;
                color: black;
                border-radius: 10px;
                cursor: pointer;
                text-decoration: none;
                position: absolute;
                top: 300px;
                left: 600px;
                `;
                Tie.append(button);
                document.body.append(Tie);
                return;
        })
    }    
})
