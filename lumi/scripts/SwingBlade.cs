using UnityEngine;
using System.Collections;

public class SwingBlade : MonoBehaviour
{
    [Header("Target Animator")]
    public Animator targetAnimator;

    [Header("Animation State Names")]
    public string moveRightAnim = "Blade Move Right";
    public string moveLeftAnim = "Blade Move Left";

    [Tooltip("Pause time at the end of each swing")]
    public float pauseDelay = 1.0f;

    private void Start()
    {
        if (targetAnimator != null)
            StartCoroutine(LoopAnimations());
        else
            Debug.LogWarning("No Animator assigned to SwingBlade!");
    }

    private IEnumerator LoopAnimations()
    {
        while (true)
        {
            targetAnimator.Play(moveRightAnim);
            yield return WaitForAnimation(moveRightAnim);
            yield return new WaitForSeconds(pauseDelay);

            targetAnimator.Play(moveLeftAnim);
            yield return WaitForAnimation(moveLeftAnim);
            yield return new WaitForSeconds(pauseDelay);
        }
    }

    private IEnumerator WaitForAnimation(string stateName)
    {
        while (!targetAnimator.GetCurrentAnimatorStateInfo(0).IsName(stateName))
            yield return null;

        while (targetAnimator.GetCurrentAnimatorStateInfo(0).normalizedTime < 1f)
            yield return null;
    }
}
