import { useQuery, useMemo, useSelector } from "../shared/hooks";
import { mainFormsHandlerTypeRaw } from "../util/Http";

export const convertTpOptionsFormate = (arr) => {
  let arrOptions = [];
  if (arr?.length > 0) {
    arrOptions = arr.map((val) => ({
      label: val.name,
      value: val._id,
      nationalId: val.nationalId,
      phoneNumber: val.phone,
      phoneNumber2: val.phone2,
    }));
  }
  return arrOptions;
};



const useTenantsOptions = () => {
  const token = useSelector((state) => state.userInfo.token);

  const { data: tenants, refetch: refetchTenants } = useQuery({
    queryKey: ["tenant", token],
    queryFn: () =>
      mainFormsHandlerTypeRaw({
        type: "contacts/tenants",
        token: token,
        isLimited: true,
      }),
    staleTime: Infinity,
    enabled: !!token,
  });

  const tenantsOptions = useMemo(() => {
    return convertTpOptionsFormate(tenants?.data) || [];
  }, [tenants]);

  return { tenantsOptions, refetchTenants };
};

export default useTenantsOptions;
