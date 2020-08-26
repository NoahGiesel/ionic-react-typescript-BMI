import React from "react";
import { IonRow, IonCol, IonCardContent } from "@ionic/react";

const BMIResult: React.FC<{ valueResult: number }> = (props) => {
  return (
    <IonRow>
      <IonCol>
        <IonCardContent className="ion-text-center">
          <h2>Your Body Mass Index </h2>
          <h3>{props.valueResult.toFixed(2)}</h3>
        </IonCardContent>
      </IonCol>
    </IonRow>
  );
};

export default BMIResult;
