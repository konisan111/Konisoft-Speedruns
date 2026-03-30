using UnityEngine;

public class GateObstacle : MonoBehaviour
{
    private Animator animator;
    public PolygonCollider2D polyCollider;

    public string downAnimation;
    public string upAnimation;

    private bool isTransitioning = false;
    [SerializeField] private float transitionCooldown = 0.2f;

    private void Awake()
    {
        animator = GetComponent<Animator>();
        polyCollider = GetComponent<PolygonCollider2D>();
    }

    public void GateUp()
    {
        if (isTransitioning) return;
        if (IsInState(upAnimation)) return;

        animator.Play(upAnimation);
        polyCollider.enabled = false;
        StartCoroutine(ResetTransition());
    }

    public void GateDown()
    {
        if (isTransitioning) return;
        if (IsInState(downAnimation)) return;

        animator.Play(downAnimation);
        polyCollider.enabled = true;
        StartCoroutine(ResetTransition());
    }

    private System.Collections.IEnumerator ResetTransition()
    {
        isTransitioning = true;
        yield return new WaitForSeconds(transitionCooldown);
        isTransitioning = false;
    }

    private bool IsInState(string stateName)
    {
        return animator.GetCurrentAnimatorStateInfo(0).IsName(stateName);
    }
}
