using UnityEngine;

public class PressContinue : MonoBehaviour {
    public GameObject fadeObject;
    
    void Update(){
        if (Input.anyKeyDown){
            fadeObject.SetActive(true);
        }
    }
}
