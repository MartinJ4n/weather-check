import { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import { ForecastData } from "../../interfaces";

import styles from "./Dropdown.module.sass";

type DropdownProps = {
  cities: {
    name: string;
    selected: boolean;
    data: ForecastData | undefined;
  }[];
  selectionToggle: boolean;
  onCitySelection: (cityName: string) => void;
  onSelectionToggle: () => void;
};

const Dropdown: FC<DropdownProps> = ({
  cities,
  selectionToggle,
  onCitySelection,
  onSelectionToggle,
}): ReactElement => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dropdownItem} onClick={onSelectionToggle}>
        <p>{cities.find(({ selected }) => selected === true)?.name}</p>
      </div>

      <motion.div
        animate={{ height: selectionToggle ? "auto" : 0 }}
        transition={{ duration: 0.2 }}
        className={styles.dropdownBox}
      >
        {cities
          .filter(({ selected }) => selected !== true)
          .map(({ name }, index) => (
            <div className={styles.dropdownItem} key={index}>
              <p onClick={() => onCitySelection(name.toLocaleLowerCase())}>
                {name}
              </p>
            </div>
          ))}
      </motion.div>
    </div>
  );
};

export default Dropdown;
