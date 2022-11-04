import { useEffect, useState } from "react";
import moment from "moment";

import { Link, useLocation } from "react-router-dom";

import api from "../../services/api";
import "./style.scss";

import loginIcon from "../../assets/img/login-icon.png";
import Infos from "../../components/Infos";
import checkEmail from "../../services/checkEmail";
import checkCPF from "../../services/checkCPF";
import maskCPF from "../../services/maskCPF";
import checkAge from "../../services/checkAge";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCPF] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (value, field) => {
        switch (field) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "cpf":
                setCPF(maskCPF(value));
                break;
            case "birthday":
                setBirthday(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        if (!checkEmail(email)) return alert("E-mail inválido");
        if (!checkCPF(cpf)) return alert("CPF inválido");
        if (checkAge(birthday) < 18)
            return alert("É necessário possuir mais de 18 anos!");
        if (!isChecked) {
            return alert("Por favor, concorde com os termos");
        }
        api.post("/users/register", {
            name,
            email,
            cpf,
            birthday,
            password,
            confirmPassword,
        })
            .then((res) => {
                alert("Cadastro efetuado com sucesso!");
                window.location.href = "/login";
            })
            .catch((err) => {
                alert(err.response.data.message);
                window.location.reload();
            });
    };

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    useEffect(() => {
        if (query.get("name")) setName(query.get("name"));
        if (query.get("email")) setEmail(query.get("email"));
        if (query.get("birthday"))
            setBirthday(moment(query.get("birthday")).format("YYYY-MM-DD"));
        // eslint-disable-next-line
    }, []);

    return (
        <div className="page-container-register">
            <Infos />
            <div className="login-container">
                <div className="top-container">
                    <div className="login-text">
                        <h2>CADASTRE-SE</h2>
                    </div>
                    <div className="login-icon">
                        <img
                            className="img"
                            src={loginIcon}
                            alt="Icone de login"
                        />
                    </div>
                </div>
                <div className="middle-container">
                    <input
                        onChange={(event) =>
                            handleChange(event.target.value, "name")
                        }
                        value={name}
                        type="text"
                        className="field"
                        placeholder="Nome completo*"
                    />
                    <input
                        onChange={(event) =>
                            handleChange(event.target.value, "email")
                        }
                        value={email}
                        type="text"
                        className="field"
                        placeholder="Email*"
                    />
                    <input
                        onChange={(event) =>
                            handleChange(event.target.value, "cpf")
                        }
                        value={cpf}
                        type="text"
                        className="field"
                        placeholder="CPF*"
                        pattern="[0-9]{11}"
                    />
                    <input
                        type="date"
                        max={moment()
                            .subtract(18, "years")
                            .format("yyyy-MM-DD")}
                        className="field"
                        placeholder="Data de nascimento*"
                        onChange={(event) =>
                            handleChange(event.target.value, "birthday")
                        }
                        value={birthday}
                    />
                    <input
                        onChange={(event) =>
                            handleChange(event.target.value, "password")
                        }
                        value={password}
                        type="password"
                        className="field"
                        placeholder="Senha*"
                    />
                    <input
                        type="password"
                        className="field"
                        placeholder="Confirmar senha*"
                        onChange={(event) =>
                            handleChange(event.target.value, "confirmPassword")
                        }
                        value={confirmPassword}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") handleSubmit();
                        }}
                    />
                </div>
                <div className="bottom-container">
                    <h4>
                        <input
                            onClick={() => setIsChecked(!isChecked)}
                            type="checkbox"
                        ></input>
                        Li e aceito os{" "}
                        <Link to="/use-terms" className="register">
                            Termos de Uso.
                        </Link>
                    </h4>
                </div>
                <div className="bottom-container">
                    <div className="button-enter">
                        <button
                            onClick={handleSubmit}
                            className="btn btn-enter"
                        >
                            CADASTRAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
