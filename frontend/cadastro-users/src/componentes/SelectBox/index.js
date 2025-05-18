import styles from "./SelectBox.module.css";
import { useState } from "react";

export default function SelectBox({ label, options, onChange = () => {} }) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onChange(value);
        console.log(`Valor selecionado (para API): ${value}`);
    };

    return (
        <div className={styles.selectContainer}>
            <div className={styles.label}>
                <label>{label}</label>
            </div>
            <select className={styles.select} value={selectedOption} onChange={handleChange}>
                <option value="" disabled>
                    Selecione uma opção
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
