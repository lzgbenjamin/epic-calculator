class App extends React.Component {
    state ={
        currentNumber: '0',
        calc: undefined,
        operation: undefined,
        sequence: undefined
    }

    handleClick = (event) => {
        const {currentNumber, calc, operation, sequence} = this.state;
        const {innerText} = event.target;

        if(!Number.isNaN(Number(innerText))) {
            if(currentNumber === '0') {
                this.setState({
                    currentNumber:innerText
                });
            } else {
                this.setState({
                    currentNumber: currentNumber + innerText
                });
            }

            return;
        }

        switch(innerText) {
            case 'AC': {
                this.setState({
                    currentNumber: '0',
                    calc: undefined,
                    operation: undefined,
                    sequence: undefined,
                    store: undefined
                });
                break;
             }

            case '.': {
                if(!currentNumber.includes('.')) {
                    this.setState({
                        currentNumber: currentNumber + innerText
                    });
                 };
                 break;
            }

            default: {
                if(!operation) { 
                    if(innerText === 'x') {
                        const bruh = '*'
                        this.setState({
                            operation: bruh,
                            calc: currentNumber,
                            sequence: currentNumber + innerText,
                            currentNumber: '0'
                        });
                    } 
                    else if (innerText === '÷') {
                        const pog = '/'
                        this.setState({
                            operation: pog,
                            calc: currentNumber,
                            sequence: currentNumber + innerText,
                            currentNumber: '0'
                        });
                    } else {
                        this.setState({
                            operation: innerText,
                            calc: currentNumber,
                            sequence: currentNumber + innerText,
                            currentNumber: '0'
                        });
                    }
                } else if (innerText === "=") {
                    const evaluated = eval(`${calc} ${operation} ${currentNumber}`);
                    this.setState({
                        operation: undefined,
                        calc: evaluated,
                        currentNumber: evaluated,
                        sequence: sequence + currentNumber + '='
                    });
                } else {
                    const evaluated = eval(`${calc} ${operation} ${currentNumber}`);
                    if(innerText === '-') {
                        this.setState({
                            currentNumber: '-'
                        })

                    } else {
                
                        if(innerText === 'x') {
                            const bruh = '*'
                            this.setState({
                                operation: bruh,
                                calc: evaluated,
                                currentNumber: '0',
                                sequence: sequence + currentNumber + innerText
                            });
                        } 
                        else if (innerText === '÷') {
                            const pog = '/'
                            this.setState({
                                operation: pog,
                                calc: evaluated,
                                currentNumber: '0',
                                sequence: sequence + currentNumber + innerText
                            });
                        } else {
                            this.setState({
                                operation: innerText,
                                calc: evaluated,
                                currentNumber: '0',
                                sequence: sequence + currentNumber + innerText
                            });
                        }   
                    } 
                }
            }
        }
    }

    render() {

        const {sequence, currentNumber, calc} = this.state;
        return(
        <div id="calc-container" className="d-flex align-items-center justify-content-center">
        <div className="layout">
        <p style={{position:'absolute', top:0}}>{JSON.stringify(this.state,null,2)}</p>
            <div id="screen">
                <div id="logo" className="d-flex align-item-left">
                    <i className="fas fa-calculator"></i>Epic Calculator
                </div>
                <div id="display"><small>{sequence}</small>{currentNumber}</div>    
            </div>

            <div className="col-12 button-wrapper">
                <button id="clear" onClick={this.handleClick}>AC</button>
                <button id="divide" className="operations" key={"÷"} onClick={this.handleClick}>÷</button>
                <button id="seven" className="integers" key={7} onClick={this.handleClick}>7</button>
                <button id="eight" className="integers" key={8} onClick={this.handleClick}>8</button>
                <button id="nine" className="integers" key={9} onClick={this.handleClick}>9</button>
                <button id="multiply"className="operations" key={"×"} onClick={this.handleClick}>x</button>
                <button id="four" className="integers" key={4} onClick={this.handleClick}>4</button>
                <button id="five" className="integers" key={5} onClick={this.handleClick}>5</button>
                <button id="six" className="integers" key={6} onClick={this.handleClick}>6</button> 
                <button id="subtract" className="operations" key={"-"} onClick={this.handleClick}>-</button>
                <button id="one" className="integers" key={1} onClick={this.handleClick}>1</button>
                <button id="two" className="integers" key={2} onClick={this.handleClick}>2</button>
                <button id="three" className="integers" key={3} onClick={this.handleClick}>3</button>
                <button id="add"className="operations" key={"+"} onClick={this.handleClick}>+</button>
                <button id="zero" className="integers" key={0} onClick={this.handleClick}>0</button>
                <button id="decimal" onClick={this.handleClick}>.</button>
                <button id="equals" key={"="} onClick={this.handleClick}>=</button>
            </div>
        </div>
        </div>
        )
    }

}


ReactDOM.render(<App />, document.getElementById("app"));