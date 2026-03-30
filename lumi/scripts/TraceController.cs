using UnityEngine;
using System.Collections;
public class TraceController : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(DestroyAfterDelay());
    }

    IEnumerator DestroyAfterDelay()
    {
        yield return new WaitForSeconds(0.5f);
        Destroy(gameObject);
    }
}
