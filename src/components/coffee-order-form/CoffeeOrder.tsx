import React from "react";
import Coffee from "../../model/Coffee";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CoffeeOrder.css";

interface Props {
    submitter: (coffee: Coffee) => void;
}

const CoffeeOrder: React.FC<Props> = ({submitter}) => {
    const {register, formState, handleSubmit, reset, resetField} = useForm<Coffee>();
    const [isEspresso, setIsEspresso] = React.useState<boolean>(false);
    const [isLatte, setIsLatte] = React.useState<boolean>(false);
    const [coffeeSelected, setCoffeeSelected] = React.useState<boolean>(false);
    const [strength, setStrength] = React.useState<number>(6);

    return (
        <form onSubmit={handleSubmit(data => {
                submitter(data);
                reset();
            })} onReset={() => {
                reset();
                setIsEspresso(false);
                setIsLatte(false);
                setCoffeeSelected(false);
                setStrength(6);
            }}>
            <h1>Coffee Order</h1>
            <div className="form-floating mb-3">
                <select className="form-select" {...register("type", {required: true, onChange: (e) => {setIsEspresso(e.target.value === "Espresso");
                    setIsLatte(e.target.value === "Latte");
                    setCoffeeSelected(e.target.value !== "Espresso" && e.target.value !== "Latte" && e.target.value !== "");
                    resetField("flavor",);
                    resetField("size");
                }
                })}>
                    <option value="">Please select</option>
                    <option value="Espresso">Espresso</option>
                    <option value="Capuccino">Capuccino</option>
                    <option value="Latte">Latte</option>
                </select>
                <label >Type</label>
            </div>
            {formState.errors?.type?.type === "required" && <p className="error form-text">Please select coffee type</p>}

            <div className="form-floating mb-3">
                <input type="email" placeholder="Enter your email" className="form-control" 
                    {...register("email",{required: true})}/>
                <label>Email</label>

            </div>
            {formState.errors?.email?.type === "required" && <p className="error form-text">Please enter your email</p>}

            <div className="mb-3">
                <label className="form-label">Size</label>
                {(!coffeeSelected && !isEspresso && !isLatte) && <p className="form-text">Please select coffee type first</p>}
                {(isEspresso || coffeeSelected) && <div className="form-check">
                        <input type="radio" className="form-check-input" value="small" {...register("size", {required: true})}/>
                        <label className="form-check-label">Small</label>
                    </div>}
                {isEspresso &&  <div className="form-check">
                        <input type="radio" className="form-check-input" value="double" 
                            {...register("size", {required: true})}/>
                        <label className="form-check-label">Double</label>
                    </div>}
                {(coffeeSelected || isLatte) && <div className="form-check">
                                        <input type="radio" className="form-check-input" value="large" 
                        {...register("size", {required: true})}/>
                    <label className="form-check-label">Large</label>
                </div>}
                {isLatte && <div className="form-check">
                    <input type="radio" className="form-check-input" value="giant" 
                        {...register("size", {required: true})}/>
                    <label className="form-check-label">Giant</label>
                </div>}
            {formState.errors?.size?.type === "required" && <p className="error form-text">Please select size</p>}
            </div>

            <div className="mb-3">
                <label className="form-label">Flavor</label>
                {(!coffeeSelected && !isEspresso && !isLatte) && <p className="form-text">Please select coffee type first</p>}
                {isEspresso && <p className="form-text">Espresso is rich and refreshing, enjoy it without any flavor</p>}
                {(isLatte || coffeeSelected) && <div className="form-check block">
                    <label className="form-check-label"><input type="checkbox" className="form-check-input" value="vanilla"
                        {...register("flavor")}/>Vanilla</label>
                </div>}
                {isLatte && <div className="form-check block">
                    <label className="form-check-label"><input type="checkbox" className="form-check-input" value="pumpkin" 
                        {...register("flavor")}/>Pumpkin</label>
                </div>}
                {(isLatte || coffeeSelected) && <div className="form-check block">
                    <label className="form-check-label"><input type="checkbox" className="form-check-input" value="chocolate"
                        {...register("flavor")}/>Chocolate</label>
                </div>}
                {(isLatte || coffeeSelected) && <div className="form-check block">
                    <label className="form-check-label"><input type="checkbox" className="form-check-input" value="caramel"
                        {...register("flavor")}/>Caramel</label>
                </div>}
            </div>

            <div className="mb-3 d-flex flex-column">
            <label className="form-label" htmlFor="strength">Strength {strength}</label>
            <input type="range" className="form-range w-50" min="0" max="11" id="strength"
                {...register("strength", {required: true, min:1, max:10, value:6, onChange(event) {
                    setStrength(parseInt(event.target.value));
                },})} />
            {formState.errors?.strength?.type === "min" && <p className="error form-text">Your coffee cannot consist of water only, please add at least some coffee</p>}
            {formState.errors?.strength?.type === "max" && <p className="error form-text">It's too hard, we cannot expose you to such a risk</p>}
            </div>
            <div className="mb-3 d-flex justify-content-around w-50">
                <button type="submit" className="btn btn-primary">Place order</button>
                <button type="reset" className="btn btn-secondary">Clear order</button>
            </div>
        </form>
    )
}

export default CoffeeOrder;