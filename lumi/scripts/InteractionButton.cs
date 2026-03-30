using UnityEngine;

public class InteractionButton : MonoBehaviour
{
    public GameObject FenceObject;
    FenceController fenceController;
    public Animator animator;
    public GameObject animatedButton;

    private void Start(){
        animator = animatedButton.GetComponent<Animator>();
        fenceController = FenceObject.GetComponent<FenceController>();
        animator.enabled = false;
    }

    public void OnTriggerEnter2D(Collider2D collision){
        if(collision.gameObject.name == "InteractionTrigger"){
            fenceController.doFenceDeactivate = true;
            animator.enabled = true;
        }
    }
}
