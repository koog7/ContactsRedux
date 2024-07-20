const CreateEditBlock = () => {
    return (
        <div>
            <div style={{width:'300px', display:'flex', flexDirection:'column', margin: '0 auto'}}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="number">Number:</label>
                <input type="text" id="number" name="number" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="photo">Photo URL:</label>
                <input type="text" id="photo" name="photo" />

                <div>
                    <p>Photo preview</p>
                    <img src={'https://via.placeholder.com/210x295?text=No+Image'} alt={'ggg'}/>
                </div>
            </div>
        </div>
    );
};

export default CreateEditBlock;