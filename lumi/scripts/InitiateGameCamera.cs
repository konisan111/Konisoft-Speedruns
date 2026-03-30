using UnityEngine;
using System;
using System.Collections;

public class InitiateGameCamera : MonoBehaviour{
    public GameObject Camera;

    void Start(){
        StartCoroutine(DisableAnimatorAfterTime(2f));
    }

    private IEnumerator DisableAnimatorAfterTime(float time){
        yield return new WaitForSeconds(time);
        Camera.SetActive(true);
        gameObject.SetActive(false);
    }
}
