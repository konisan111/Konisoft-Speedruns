using System.Collections;
using UnityEngine;
using UnityEngine.EventSystems;

public class Crusher : MonoBehaviour
{
    Animator animator;
    public float delay;

    void Start()
    {
        animator = gameObject.GetComponent<Animator>();
        StartCoroutine(TriggerCrusher());
    }

    public IEnumerator TriggerCrusher()
    {
        yield return new WaitForSeconds(delay);
        animator.enabled = true;
    }
}
