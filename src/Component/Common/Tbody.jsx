import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Tbody(){
    const {user} = useContext(UserContext)
    return (
        <tbody>
            {user.map((item, index) => {
                return (
                    <tr key={index}>
                        {Object.keys(item).map((key, index) => {
                            let value = item[key];
                            return value.ishow ? <td key={index}>{value.value}</td> : null;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}