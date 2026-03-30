using UnityEngine;
using System.Collections;

public class DelayedAnimator : MonoBehaviour
{
    [SerializeField] private float delayDuration = 2.0f;
    private Animator _animator;

    void Start()
    {
        _animator = GetComponent<Animator>();

        if (_animator != null)
        {
            _animator.enabled = false;
            StartCoroutine(EnableAnimatorAfterDelay());
        }
    }

    IEnumerator EnableAnimatorAfterDelay()
    {
        yield return new WaitForSeconds(delayDuration);
        _animator.enabled = true;
    }
}