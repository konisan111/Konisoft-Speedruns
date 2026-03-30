using UnityEngine;

public class AnimatesMovementPanel : MonoBehaviour
{
    public Animator animator;
    public string animationName = "Spell Castra Slide In";
    void Start()
    {
        if (animator == null) { animator = GetComponent<Animator>(); }
    }

    public void PlayAnimation()
    {
        if (animator != null) { animator.Play(animationName); }
        else { Debug.LogWarning("There is no animator!"); }
    }
}
