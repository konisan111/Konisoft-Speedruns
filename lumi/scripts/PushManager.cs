using UnityEngine;

public class PushManager : MonoBehaviour
{
    public float pushPoints;
    public float requiredPushPoints;
    public GameObject[] enabledElements;
    public GameObject cageBlock;
    public GameObject[] specialCageBlocks;

    public AudioSource audioSource;
    public GameObject cageBreakEffect;

    private bool triggered = false;

    void Update()
    {
        if (!triggered && pushPoints >= requiredPushPoints)
        {
            triggered = true;

            foreach (GameObject obj in enabledElements)
            {
                if (obj != null) obj.SetActive(true);
            }

            HandleSingleCage(cageBlock);
            HandleCageArray(specialCageBlocks);

            if (audioSource != null) audioSource.Play();
        }
    }

    private void HandleSingleCage(GameObject block)
    {
        if (block != null)
        {
            if (cageBreakEffect != null)
            {
                Instantiate(cageBreakEffect, block.transform.position, block.transform.rotation);
            }
            Destroy(block);
        }
    }

    private void HandleCageArray(GameObject[] blocks)
    {
        if (blocks == null) return;

        foreach (GameObject block in blocks)
        {
            if (block != null)
            {
                if (cageBreakEffect != null)
                {
                    Instantiate(cageBreakEffect, block.transform.position, block.transform.rotation);
                }
                Destroy(block);
            }
        }
    }
}