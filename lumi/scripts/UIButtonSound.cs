using System.Collections;
using UnityEngine;

public class UIButtonSound : MonoBehaviour{    
    void Update(){StartCoroutine(UISoundPlayer());}
    IEnumerator UISoundPlayer(){
        yield return new WaitForSeconds(1);
        gameObject.SetActive(false);
    }
}
