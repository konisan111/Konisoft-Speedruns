using UnityEngine;

public class RemoveSaves : MonoBehaviour
{ public void OnClick() { GameManager.Instance.ResetAllData(); } }
