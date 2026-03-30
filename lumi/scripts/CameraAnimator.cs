using UnityEngine;

public class CameraAnimator : MonoBehaviour
{
    public Animator animator;

    void Start()
    {
        animator = GetComponent<Animator>();
        Invoke("DisableAnimatorComponent", 2.0f);
    }

    void DisableAnimatorComponent()
    {
        if (animator != null) { animator.enabled = false; }
    }
}
