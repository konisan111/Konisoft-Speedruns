using UnityEngine;
using System.Collections;

public class FidgetHord : MonoBehaviour{
    Animator animator;
    public float delay;

    void Start () {
        animator = gameObject.GetComponent<Animator>();
        StartCoroutine(DelayHord());
    }

    public IEnumerator DelayHord() {
        yield return new WaitForSeconds(delay);
        animator.enabled = true;
    }
}
