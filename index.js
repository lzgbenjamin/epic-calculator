const nums=[7,8,9,4,5,6,1,2,3,0];
const ops=['÷','x','-','+']

class App extends React.Component {
    state ={
        lastPressed: undefined,
        calc: '0',
        operation: undefined,
        div: "/",
        mul: "*",
        neg: "-"
    }

    handleClick = (event) => {
        const {calc, lastPressed, div, mul, neg} = this.state;
        const {innerText} = event.target;

        switch(innerText) {
            case 'AC': {
                this.setState({
                    calc: '0',
                });
                break;
             }
            case '=': {
                const evaluated = eval(calc);
                this.setState({
                    calc: evaluated
                });
                break;
            }
            case '.':{
                const splitted = calc.split(/[\+\-\x\÷]/);
                const last = splitted.slice(-1)[0];
                
                if(!last.includes('.')){
                  this.setState({
                    calc:calc+'.'
                  })
                }
                break;
            }
            default: {
                
                let e = undefined;

                if(ops.includes(innerText)) {
                    if(ops.includes(lastPressed) && innerText !== '-') {

                        const lastNumberIdx = calc.split('').reverse().findIndex(char=>char!==' ' && nums.includes(+char));

                        e = calc.slice(0,calc.length - lastNumberIdx) + `${innerText}`; 
                   
                    } else {
                       if (innerText === "÷") {

                            e =  `${calc}${div}`

                       }
                       
                       else if (innerText === "x") {

                            e= `${calc}${mul}`
                        
                       } else {
                        e =  `${calc}${innerText}`
                       }
                    }
                } else {
                    e = (calc === '0') ? innerText : (calc + innerText);
                }

                this.setState({
                    calc: e 
                });
            }
        }

        this.setState({
            lastPressed: innerText
          })

    }

    render() {

        const {calc} = this.state;
        return(
        <div id="calc-container" className="d-flex align-items-center justify-content-center">
        <div className="layout">
        {/* <p style={{position:'absolute', top:0}}>{JSON.stringify(this.state,null,2)}</p> */}
            <div id="screen">
                <div id="logo" className="d-flex align-item-left">
                    <i className="fas fa-calculator"></i>Epic Calculator
                </div>
                <div id="display">{calc}</div>    
            </div>

            <div className="col-12 button-wrapper">
                <button id="clear" onClick={this.handleClick}>AC</button>
                <button id="divide" className="operations" onClick={this.handleClick}>÷</button>
                <button id="seven" className="integers" onClick={this.handleClick}>7</button>
                <button id="eight" className="integers" onClick={this.handleClick}>8</button>
                <button id="nine" className="integers" onClick={this.handleClick}>9</button>
                <button id="multiply"className="operations" onClick={this.handleClick}>x</button>
                <button id="four" className="integers" onClick={this.handleClick}>4</button>
                <button id="five" className="integers" onClick={this.handleClick}>5</button>
                <button id="six" className="integers" onClick={this.handleClick}>6</button> 
                <button id="subtract" className="operations" key={"-"} onClick={this.handleClick}>-</button>
                <button id="one" className="integers" onClick={this.handleClick}>1</button>
                <button id="two" className="integers" onClick={this.handleClick}>2</button>
                <button id="three" className="integers" onClick={this.handleClick}>3</button>
                <button id="add"className="operations" onClick={this.handleClick}>+</button>
                <button id="zero" className="integers" onClick={this.handleClick}>0</button>
                <button id="decimal" onClick={this.handleClick}>.</button>
                <button id="equals" key={"="} onClick={this.handleClick}>=</button>
            </div>
        </div>
        </div>
        )
    }

}


ReactDOM.render(<App />, document.getElementById("app"));