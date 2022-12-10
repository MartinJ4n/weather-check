import { useState, useEffect, FC, ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { City } from "../../interfaces";

import Dropdown from "../../components/Dropdown";
import GlassCard from "../../components/GlassCard";

import styles from "./Home.module.sass";

const Home: FC = (): ReactElement => {
  const [selectionToggle, setSelectionToggle] = useState(false);
  const [cities, setCities] = useState<City[]>([
    {
      name: "Oslo",
      selected: true,
      data: undefined,
    },
    {
      name: "Bergen",
      selected: false,
      data: undefined,
    },
    {
      name: "Stavanger",
      selected: false,
      data: undefined,
    },
    {
      name: "Trondheim",
      selected: false,
      data: undefined,
    },
    {
      name: "Bodø",
      selected: false,
      data: undefined,
    },
  ]);

  const [urlQuery] = useSearchParams();
  const navigate = useNavigate();

  const cityQuery = urlQuery.get("c");
  const selectedCity = cities.find((city) => city.selected === true);

  /**
   * Custom handlers
   */
  const handleFetch = async (url: string, index: number): Promise<void> => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const updatedCities = [...cities];
        updatedCities[index].data = data;
        setCities(updatedCities);
      });
  };

  const handleSelectionToggle = () => {
    setSelectionToggle(!selectionToggle);
  };

  const handleCitySelection = (cityName: string) => {
    navigate(`/?c=${cityName}`);
    setSelectionToggle(false);
  };
  //

  /**
   * Data fetch
   */
  useEffect(() => {
    const OsloUrl =
      "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60&lon=11";
    const BergenUrl =
      "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.3&lon=5.32";
    const StavangerUrl =
      "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59&lon=5.73";
    const TrondheimUrl =
      "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.4&lon=10.4";
    const BodoUrl =
      "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=67.3&lon=14.4";

    handleFetch(OsloUrl, 0);
    handleFetch(BergenUrl, 1);
    handleFetch(StavangerUrl, 2);
    handleFetch(TrondheimUrl, 3);
    handleFetch(BodoUrl, 4);
  }, []);

  /**
   * Selecting a particular city based on the URL
   * Basically, we copy the state, make changes, and update the state
   * The setTimeout allows the animation to finish before the state updates
   */
  useEffect(() => {
    const updatedCities = [...cities];

    for (const element of updatedCities) {
      element.selected = false;
    }

    if (cityQuery === "oslo") {
      updatedCities[0].selected = true;
      setTimeout(() => {
        setCities(updatedCities);
      }, 200);
    } else if (cityQuery === "bergen") {
      updatedCities[1].selected = true;
      setTimeout(() => {
        setCities(updatedCities);
      }, 200);
    } else if (cityQuery === "stavanger") {
      updatedCities[2].selected = true;
      setTimeout(() => {
        setCities(updatedCities);
      }, 200);
    } else if (cityQuery === "trondheim") {
      updatedCities[3].selected = true;
      setTimeout(() => {
        setCities(updatedCities);
      }, 200);
    } else if (cityQuery === "bodø") {
      updatedCities[4].selected = true;
      setTimeout(() => {
        setCities(updatedCities);
      }, 200);
    } else {
      updatedCities[0].selected = true;
      setTimeout(() => {
        setCities(updatedCities);
      }, 200);
    }
  }, [cityQuery, cities]);

  /**
   * In case the query is not defined, set 'oslo' as default
   */
  useEffect(() => {
    if (cityQuery === null) {
      navigate("/?c=oslo");
    }
  }, [cityQuery]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p>Check the weather in Norway.</p>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <Dropdown
            cities={cities}
            selectionToggle={selectionToggle}
            onCitySelection={handleCitySelection}
            onSelectionToggle={handleSelectionToggle}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.rightContainer}>
          <GlassCard selectedCity={selectedCity!} />
        </div>
      </div>
    </div>
  );
};

export default Home;
