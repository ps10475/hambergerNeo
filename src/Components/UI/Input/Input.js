import React from 'react';
import classes from './Input.module.scss';

const Input = (props) => {
    let inputClasses = [classes.Input];
    let validMessage = null;
    if(props.inValid && props.touch){
        inputClasses.push(classes.InValid);
        validMessage = props.validMessage;
    }
    let inputElement = null;
    switch (props.elementType) {
        case 'input':
            inputElement = <input {...props.elementConfig} onChange={props.changed} value={props.value}  />
            break;
        case 'textarea':
            inputElement = <textarea {...props.elementConfig}  onChange={props.changed}  value={props.value}/>
            break
        case 'select':
            inputElement = (
                <select value={props.value} onChange={props.changed} >
                    {props.elementConfig.options.map((option, key) => {
                        return (
                            <option
                                key={key}
                                value={option.value}
                            >
                                {option.displayValue}
                            </option>)
                    })}
                </select>
            )
            break
        default:
            inputElement = <input  {...props.elementConfig} value={props.value} onChange={props.changed} />
    }
    return (
        <div className={inputClasses.join(' ')}>
            <label className={classes.Label}> {props.label}  </label>
            {inputElement}
            <span className={classes.ValidMessage}> {validMessage} </span>
        </div>
    );
}

export default Input;
