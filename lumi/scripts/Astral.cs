using System.Collections;
using UnityEngine;

public class Astral : MonoBehaviour
{
    [Header("GameObject Declaring")]
    public GameObject laserBeamPrefab;
    public GameObject despawnLaserBeamPrefab;
    public GameObject preBeamParticles;
    private PlayerController playerController;
    private GameObject playerObject;

    [Header("Safety Switch")]
    public bool safetySwitch;

    [Header("Sound System")]
    public AudioSource audioSource;
    public AudioClip laserBeamSound;
    public AudioClip laserBeamShootSound;
    private float a; private float b; private float c = 3;
    private bool onCollider;

    void Start()
    {
        playerObject = GameObject.FindGameObjectWithTag("Player");
        playerController = playerObject.GetComponent<PlayerController>();
    }

    void Update()
    {
        b = a;
        a = playerController.currentStepCounts;
        if (b != a) c++;

        if (ChangeAllowance())
        {
            switch (c)
            {
                case 1:
                    print("PreBeamParticles");
                    SetPreLaserBeam();
                    break;
                case 2:
                    print("LaserBeam");
                    StartCoroutine(SetLaserBeam());
                    break;
                case 3:
                    print("DestroyLaserBeam");
                    c = 0;
                    safetySwitch = true;
                    DestroyLaserBeam();
                    break;
            }
        }
    }
    private bool ChangeAllowance()
    {
        if (playerController.closeDeath == false)
            return true;
        else return false;
    }
    public void SetPreLaserBeam() { preBeamParticles.SetActive(true); }

    public IEnumerator SetLaserBeam()
    {
        if (safetySwitch && !onCollider)
        {
            safetySwitch = false;
            LaserBeamAction();
        }
        else if (safetySwitch && onCollider)
        {
            safetySwitch = false;
            yield return new WaitForSeconds(0.5f);
            onCollider = false;
            LaserBeamAction();
        }
    }

    public void LaserBeamAction()
    {
        preBeamParticles.SetActive(false);
        Vector3 loweredPosition = transform.position + new Vector3(0f, -0.5f, 0f);
        Instantiate(laserBeamPrefab, loweredPosition, transform.rotation, this.transform);
        audioSource.PlayOneShot(laserBeamShootSound);
    }

    public void DestroyLaserBeam()
    {
        GameObject child = null;
        foreach (Transform transform in gameObject.transform)
        {
            if (transform.CompareTag("LaserBeam"))
            {
                child = transform.gameObject;
                break;
            }
        }
        if (child == null) return;
        else
        {
            child.GetComponent<PolygonCollider2D>().enabled = false;
            Destroy(child);
            Vector3 loweredPosition = transform.position + new Vector3(0f, -0.5f, 0f);
            Instantiate(despawnLaserBeamPrefab, loweredPosition, transform.rotation, this.transform);
        }
    }

    public void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player")) { onCollider = true; }
    }
}
