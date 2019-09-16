import React from 'react'
import useSignUpForm from '../../hooks/useSignupForm'

const SignUp = () => {

    const signupCallback = () => {
        alert(`User Created!
               Email: ${inputs.email}`);
    }

    const feilds = {email: '', password1: '', password2: ''}

    const {inputs, handleInputChange, handleSubmit} = useSignUpForm(feilds, signupCallback)

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-control'>
                <input type='email' name='email' placeholder='Email Address' onChange={handleInputChange} value={inputs.email} required />
            </div>
            <div className='form-control'>
                <input type='password' name='password1' placeholder='Password' onChange={handleInputChange} value={inputs.password1} required/>
            </div>
            <div className='form-control' >
                <input type='password' name='password2' placeholder='Re-enter Password' onChange={handleInputChange} value={inputs.password2} required/>
            </div>
            <button type='submit'>Sign Up</button>
        </form>
    )
}

export default SignUp

// inputChangedHandler = (event, controlName) => {
//     const updatedControls = {
//         ...this.state.controls,
//         [controlName]: {
//             ...this.state.controls[controlName],
//             value: event.target.value,
//             valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
//             touched: true
//         }
//     };
//     this.setState({controls: updatedControls});
// }

// const formElementsArray = [];
// for ( let key in this.state.controls ) {
//     formElementsArray.push( {
//         id: key,
//         config: this.state.controls[key]
//     } );
// }

// const form = formElementsArray.map( formElement => (
//     <Input
//         key={formElement.id}
//         elementType={formElement.config.elementType}
//         elementConfig={formElement.config.elementConfig}
//         value={formElement.config.value}
//         invalid={!formElement.config.valid}
//         shouldValidate={formElement.config.validation}
//         touched={formElement.config.touched}
//         changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
// ) );

// return (
//     <div className={classes.Auth}>
//         <form onSubmit={this.submitHandler}>
//             {form}
//             <Button btnType='Success'>SUBMIT</Button>
//         </form>
//     </div>
// );