using System.Collections;
using UnityEngine;

public class TutorialEnabler : MonoBehaviour{
    public GameObject firstTutorialPart;

    void Update(){
        StartCoroutine(EnableTutorial());
    }
    public IEnumerator EnableTutorial(){
        yield return new WaitForSeconds(2.5f);
        firstTutorialPart.SetActive(true);
    }
}
