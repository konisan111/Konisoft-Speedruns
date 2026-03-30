using UnityEngine;
using System.Collections;

public class Spike : MonoBehaviour
{
    [Header("Animator Controls")]
    public GameObject[] Spikes;

    [Header("Timing Settings")]
    public float initialDelay = 1.0f;
    public float upDuration = 1.0f;
    public float downDuration = 1.0f;

    [Header("Audio")]
    public AudioClip spikePopSound;
    private AudioSource audioSource;

    private void Start()
    {
        audioSource = GetComponent<AudioSource>();
        if (audioSource == null)
            audioSource = gameObject.AddComponent<AudioSource>();

        StartCoroutine(SpikeLoop());
    }

    private IEnumerator SpikeLoop()
    {
        yield return new WaitForSeconds(initialDelay);

        while (true)
        {
            SpikeAppears();
            yield return new WaitForSeconds(upDuration);

            SpikeDisappears();
            yield return new WaitForSeconds(downDuration);
        }
    }

    private void SpikeAppears()
    {
        gameObject.tag = "Enemy";
        foreach (GameObject spikey in Spikes)
        {
            Animator animator = spikey.GetComponent<Animator>();
            if (animator != null) animator.Play("Spike Pop Up");
        }

        if (spikePopSound != null && audioSource != null)
            audioSource.PlayOneShot(spikePopSound);
    }

    private void SpikeDisappears()
    {
        foreach (GameObject spikey in Spikes)
        {
            Animator animator = spikey.GetComponent<Animator>();
            if (animator != null) animator.Play("Spike Pop Back");
        }
        gameObject.tag = "Untagged";
    }
}