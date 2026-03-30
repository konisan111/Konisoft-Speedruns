using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class JellyText : MonoBehaviour
{
    public Text targetText;

    [Header("Jelly Settings")]
    public float punchScale = 1.2f;
    public float duration = 0.15f;

    private string _lastContent;
    private Vector3 _originalScale;
    private Coroutine _jellyRoutine;

    void Awake()
    {
        if (targetText == null) targetText = GetComponent<Text>();

        if (targetText != null)
        {
            _originalScale = targetText.transform.localScale;
            _lastContent = targetText.text;
        }
    }

    void Update()
    {
        if (targetText == null) return;

        if (targetText.text != _lastContent)
        {
            _lastContent = targetText.text;
            TriggerJelly();
        }
    }

    public void TriggerJelly()
    {
        if (_jellyRoutine != null) StopCoroutine(_jellyRoutine);
        _jellyRoutine = StartCoroutine(JellyAnimation());
    }

    IEnumerator JellyAnimation()
    {
        targetText.transform.localScale = _originalScale * punchScale;

        float elapsed = 0f;
        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            targetText.transform.localScale = Vector3.Lerp(_originalScale * punchScale, _originalScale, elapsed / duration);
            yield return null;
        }

        targetText.transform.localScale = _originalScale;
    }
}