using UnityEngine;

public class SummonAnimationDisable : MonoBehaviour{
    public Animator animator;
    void Start(){
        animator = GetComponent<Animator>();
        if (animator != null) Destroy(animator);
    }
}
