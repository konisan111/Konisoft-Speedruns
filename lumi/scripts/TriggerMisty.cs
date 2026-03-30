using UnityEngine;

public class TriggerMisty : MonoBehaviour{
    public void triggerMistyTheCat(){
        if (GameManager.Instance != null){
            GameManager.Instance.isMistyEnabled = true;
        }
    }
}
