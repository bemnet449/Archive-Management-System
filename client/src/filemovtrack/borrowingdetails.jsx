
import Nav from "../nav and fot/navbar"

const Fbn=()=>{


    return(
        <>
        <Nav/>
        <div className="">
            <table>
                <tr>
                    <td>
                        <label>NAME</label><br/>
                    <input type="text"/>
                    </td>
                    <td>
                        <label>FNAME</label><br/>
                    <input type="text"/>
                    </td>
                    <td>
                    <label>GFNAME</label><br/>
                    <input type="text"/>
                    </td>
                    <td>
                        <button>search</button>
                    </td>
                    
                </tr>
            </table>
            
            
           
        </div>
        <div className="list">
            <table>
                <thead>
                    <td>NAME</td>
                    <td>FATHER NAME</td>
                    <td>G.FATHER NAME</td>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
        </>
       
    )
}
export default Fbn