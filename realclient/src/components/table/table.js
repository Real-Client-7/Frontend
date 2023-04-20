import "../table/table.css";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const fakeData = [
    { name: "mazen", email: "mazenelali@gmail.com", password: "11223344" },
    { name: "ali", email: "mazenelali@gmail.com", password: "11223344" },
    { name: "mahmoud", email: "mazenelali@gmail.com", password: "11223344" },
    { name: "zahraa", email: "mazenelali@gmail.com", password: "11223344" },
    { name: "breis", email: "mazenelali@gmail.com", password: "11223344" },
];

const field = ["id", "name", "email", "password", "manage"];

function Table() {
    return (
        <table className="table-container">
            <thead>
                <tr>
                    {field.map((ele) => {
                        return (
                            <th key={field.indexOf(ele)} className="table-field">
                                {ele}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {fakeData.map((ele, index) => {
                    return (
                        <tr key={fakeData.indexOf(ele)}>
                            <td className="table-field center">{index + 1}</td>
                            <td className="table-field center">{ele.name}</td>
                            <td className="table-field center">{ele.email}</td>
                            <td className="table-field center">{ele.password}</td>
                            <td className="icons">
                                <button className="icons-button">
                                    <IoEyeSharp />
                                </button>
                                <button className="icons-button">
                                    <MdDelete />
                                </button>
                                <button className="icons-button">
                                    <AiFillEdit />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Table;
