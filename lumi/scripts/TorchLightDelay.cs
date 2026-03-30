using System.Collections;
using UnityEngine;

public class AnimatorDelay : MonoBehaviour
{
    public Animator animator;
    public float delay = 0.5f;

    void Start()
    {
        StartCoroutine(ActivateAnimatorAfterDelay());
    }

    IEnumerator ActivateAnimatorAfterDelay()
    {
        yield return new WaitForSeconds(delay);
        animator.enabled = true;
    }
}
