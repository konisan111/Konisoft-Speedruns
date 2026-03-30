using UnityEngine;

public class TutorialSkipper : MonoBehaviour{
    public GameObject nextTutorialPart;
    public GameObject playerObject;
    PlayerController playerController;
    public bool startTimer = false;

    void Start (){
        playerObject = GameObject.FindGameObjectWithTag("Player");
        playerController = playerObject.GetComponent<PlayerController>();
    }
    
    void Update(){
        if (Input.GetMouseButtonDown(0)){
            nextTutorialPart.SetActive(true);
            if (startTimer) playerController.timerStop = false;
            Destroy(gameObject);
        }

        if (Input.touchCount > 0){
            Touch touch = Input.GetTouch(0);
            if (touch.phase == TouchPhase.Began){
                nextTutorialPart.SetActive(true);
                Destroy(gameObject);
            }
        }
    } 
}
