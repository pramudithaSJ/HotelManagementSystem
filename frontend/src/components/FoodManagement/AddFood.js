import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import AdminNav from '../common/adminNav/adminNav';
import "../FoodManagement/css/AddFood.css"
import ProgressBar from "../comps/ProgressBar";




const AddFood = () => {

    const navigate = useNavigate();

    const[Code, setCode] = useState("");
    const[Name, setName] = useState("");
    const[Price, setPrice] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const codeSetter = (e) => {
        setCode(e.target.value);
    }
    const nameSetter = (e) => {
        setName(e.target.value);
    }
    const priceSetter = (e) => {
        setPrice(e.target.value);
    }

    const onSubmit = (e) => {
            e.preventDefault();
            const newFood = {
                Code: Code,
                Image: url,
                Name: Name,
                Price: Price
            };
            axios.post('http://localhost:8070/food/add', newFood).then(() => {
                alert("Food item added");
                console.log(url);
                 navigate.push('/foodManagement');
            }).catch((err) => {
                alert(err);
            })
    }

    const handleChange = (e) => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image(.png, .jpeg, .jpg)');
        }
    };

    return (
       <section>
            <AdminNav/>
            <section className='AddBody'>


            <div>
                            <form class="card" style={{opacity: '0.95', marginTop:'100px'}}>
                                <br />
                                <h2 class="text-center">Add Food</h2>
                                <br />
                                <div className="container">
                                    <div><label>Food Code</label><input class="form-control" type="text" onChange={codeSetter}/>
                                    </div>
                                    <div class="form-group">
                                        <div><label >
                                            Add Image
                                        </label>
                                        <label className={"mylabel1"}>
                                            <input type="file" onChange={handleChange} />
                                            <i id="image" className="fa fa-plus-circle" size="large" />
                                        </label>
                                        </div>
                                        <br />
                                        <img width="200px " src={url} />
                                        <div className="output">

                                            { error && <div className="error">{ error }</div>}
                                            { file && <div>{ file.name }</div> }
                                            { file && <ProgressBar file={file} setFile={setFile} setUrl={setUrl}/> }
                                            {file && <div> {file.url}</div>}
                                        </div>

                                        <div><label>Name</label><input class="form-control" type="text" onChange={nameSetter}/></div>
                                        <div><label>Price(Rs)</label><input class="form-control" min="0" type="Number" onChange={priceSetter}/></div>
                                        <br/>
                                        <button class="btn btn-primary" type="submit" onClick={onSubmit}>&nbsp;Add Food</button>
                                        <br />
                                        <br />

                                    </div>
                                </div>
                            </form>
                        </div>
            </section>
       </section>
    )
}
export default AddFood;
