import React, { useRef, useState } from "react";
import { ReactComponent as Expand } from "../../assets/expand.svg";
import { ReactComponent as Shrink } from "../../assets/shrink.svg";
import CheckBoxParent from "../CheckBoxParent/CheckBoxParent";
import styles from "./index.module.css";

const CheckBoxItem = ({ data, itemCount, index }) => {
  const [expanded, setExpanded] = useState(true); //let all parent to be expanded in initial render
  const ref = useRef(null);
  const checkBoxRef = useRef(null);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  function handleClick(e) {
    // console.log(data.name, " clicked", e);
    const inputs = ref.current.querySelectorAll("input[type=checkbox]");
    //only trigger this event when this is bubbling not on its own checkox state change
    if (inputs.length && e.target !== checkBoxRef.current) {
      const inputArray = [...inputs];
      const result = inputArray.map((ele) => ele.checked);
      const checkFlag = result.indexOf(true);
      const unCheckFlag = result.indexOf(false);

      if (checkFlag !== -1 && unCheckFlag !== -1) {
        // if all input are not same in this parent then put indeterminate state on for this parent checkbox
        checkBoxRef.current.indeterminate = true;
      } else if (checkFlag !== -1 && unCheckFlag === -1) {
        // if all input are true and turn inderminate off and true the state of parent checkbox because all child input box are in checked state
        checkBoxRef.current.indeterminate = false;
        checkBoxRef.current.checked = true;
      } else {
        // if all input are false and turn inderminate off and false the state of parent checkbox because all child input box are in unchecked state

        checkBoxRef.current.indeterminate = false;
        checkBoxRef.current.checked = false;
      }
    }
  }

  function toggleActiveState(e) {
    const value = e.target.checked;
    e.target.indeterminate = false;
    const inputs = ref.current.querySelectorAll("input[type=checkbox]");

    if (inputs) {
      // console.log("inouts", inputs);
      //if checked state for parent is true put all child checkbox to checked state
      inputs.forEach((element) => {
        element.checked = value;
        element.indeterminate = false;
      });
    }
  }
  const childrenLength = data.children.length;
  const isNotLastElementAndHaveChildren =
    !!data.children.length && index + 1 !== itemCount;
  const isLastElementHaveChildAndExpanded =
    index + 1 === itemCount && !!data.children.length && expanded;

  return (
    <div onClick={handleClick} className={styles.test}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {!!childrenLength && (
          <div className={styles.stateBox} onClick={toggleExpanded}>
            {expanded ? <Shrink /> : <Expand />}
          </div>
        )}
        {!childrenLength && <div className={styles.horizontalLine}></div>}

        <input
          ref={checkBoxRef}
          type="checkbox"
          data-name={data.name}
          defaultValue={false} //let default state of
          onChange={(e) => toggleActiveState(e)}
        />
        <label
          style={{
            overflowWrap: "break-word",
            fontWeight: `${childrenLength ? "600" : "400"}`,
            color: `${childrenLength ? "#0D2238" : "#7A7A7A"}`,
          }}
        >
          {data.name}
        </label>
      </div>
      <div ref={ref} style={{ display: `${expanded ? "block" : "none"}` }}>
        <CheckBoxParent data={data.children} />
      </div>
      {isNotLastElementAndHaveChildren && (
        <div className={styles.verticalLine}></div>
      )}

      {isLastElementHaveChildAndExpanded && (
        <div
          style={{ height: "calc(100% - 32px)" }}
          className={styles.verticalLine}
        ></div>
      )}
    </div>
  );
};

export default CheckBoxItem;
