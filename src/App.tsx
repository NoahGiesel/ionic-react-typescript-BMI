import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonAlert,
} from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import BMIControls from "./components/BMIControls";
import BMIResult from "./components/BMIResult";
import InputControl from "./components/InputControl";
import { enter } from "ionicons/icons";

const App: React.FC = () => {
  const [getBmi, setBmi] = useState<number>();
  const [getAlert, setAlert] = useState<string>();
  const [selectedMetric, setSelectedMetric] = useState<"mkg" | "ftlbs">("mkg");
  const weightInputRefs = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const calculateBMI = () => {
    const enteredWeight = weightInputRefs.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      setAlert("Please enter a valid (non-negative) input value!");
      return;
    }
    const weightConversionFactor = selectedMetric === "ftlbs" ? 2.2 : 1;
    const heightConversionFactor = selectedMetric === "ftlbs" ? 3.28 : 1;
    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    //+ for converting to numbers
    const bmi = weight / (height * height);
    setBmi(bmi);
  };
  const resetInput = () => {
    //this will always be someting else than null
    weightInputRefs.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const selectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setSelectedMetric(selectedValue);
  };
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl
                selectedValue={selectedMetric}
                onSelectValue={selectCalcUnitHandler}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Height ({selectedMetric === "mkg" ? "meters" : "feet"}){" "}
                </IonLabel>
                <IonInput type="number" ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Weight ({selectedMetric === "mkg" ? "kg" : "lbs"}){" "}
                </IonLabel>
                <IonInput type="number" ref={weightInputRefs}></IonInput>
              </IonItem>
            </IonCol>
            <BMIControls onCalculate={calculateBMI} onReset={resetInput} />
          </IonRow>

          {getBmi && <BMIResult valueResult={getBmi} />}
        </IonGrid>
      </IonContent>
      <IonAlert
        isOpen={!!getAlert}
        message={getAlert}
        buttons={[
          {
            text: "Okay",
            handler: () => {
              setAlert("");
            },
          },
        ]}
      />
    </IonApp>
  );
};

export default App;
