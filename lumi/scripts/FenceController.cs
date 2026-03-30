using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FenceController : MonoBehaviour{
    public Animator animator;
    public GameObject FenceAnimated;
    public bool doFenceDeactivate;

    private void Start(){
        animator = FenceAnimated.GetComponent<Animator>();
        animator.enabled = false;
    }

    public void Update(){
        if (doFenceDeactivate) {
            animator.Play("fence opening");
            StartCoroutine(DestroyGameObject());
        }
    }
    IEnumerator DestroyGameObject(){
        yield return new WaitForSeconds(1);
        Destroy(gameObject);
    }
}
