using UnityEngine;
using System;
using System.Collections;
public class DisableChapterTitle : MonoBehaviour{
    private Animator animator;
    void Start(){
        animator = GetComponent<Animator>();
        StartCoroutine(DisableAnimatorAfterTime(4f));
    }
    private IEnumerator DisableAnimatorAfterTime(float time){
        yield return new WaitForSeconds(time);
        animator.enabled = false;
    }
}

