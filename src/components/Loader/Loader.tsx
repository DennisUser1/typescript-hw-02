import { Bars } from "react-loader-spinner";
import styles from "./Loader.module.css";

export default function Loader () {
  return (
        <div className={styles.loaderWrapper}>
          <Bars
            height="80"
            width="80"
            color="#9381ff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
  );
};